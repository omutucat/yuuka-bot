const { SlashCommandBuilder } = require('discord.js');

// 指定した時間（ミリ秒）待機する関数
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 分をミリ秒に変換する関数
function minutesToMilliseconds(minutes) {
  return minutes * 60 * 1000;
}

// 引数のバリデーションを行う関数
function isValid(workTime, breakTime, repeatTimes) {
  return (
    workTime > 0 &&
    workTime <= 60 &&
    breakTime > 0 &&
    breakTime <= 60 &&
    repeatTimes > 0 &&
    repeatTimes <= 10
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pomodoro')
    .setDescription('ポモドーロタイマーを開始します')
    .addIntegerOption((option) =>
      option.setName('work').setDescription('作業時間（分）').setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName('break')
        .setDescription('休憩時間（分）')
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option.setName('repeat').setDescription('繰り返し回数').setRequired(true),
    ),
  async execute(interaction) {
    try {
      const workTime = interaction.options.getInteger('work');
      const breakTime = interaction.options.getInteger('break');
      const repeatTimes = interaction.options.getInteger('repeat');

      if (!isValid(workTime, breakTime, repeatTimes)) {
        await interaction.reply(
          '作業時間と休憩時間は1分以上60分以下、繰り返し回数は1以上10以下である必要があります。',
        );
        return;
      }

      await interaction.reply(`ポモドーロタイマーを開始します。`);

      for (let i = 0; i < repeatTimes; i++) {
        await interaction.followUp(`${workTime}分間の作業を始めてください。`);

        // 作業時間待機
        await sleep(minutesToMilliseconds(workTime));
        await interaction.followUp(
          `作業時間が終了しました。${breakTime}分間の休憩を取ってください。`,
        );

        // 休憩時間待機
        await sleep(minutesToMilliseconds(breakTime));
        await interaction.followUp('休憩時間が終了しました。');
      }
      await interaction.followUp('ポモドーロタイマーを終了します。');
    } catch (error) {
      console.error(`エラーが発生しました: ${error}`);
      await interaction.reply('エラーが発生しました。');
    }
  },
};
