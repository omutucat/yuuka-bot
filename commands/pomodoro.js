const { SlashCommandBuilder } = require('discord.js');

// 指定した時間（ミリ秒）待機する関数
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 分をミリ秒に変換する関数
function minutesToMilliseconds(minutes) {
  return minutes * 60 * 1000;
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

      // バリデーション
      if (workTime <= 0 || breakTime <= 0 || repeatTimes <= 0) {
        await interaction.reply('すべての設定値は1以上である必要があります。');
        return;
      }

      await interaction.reply(
        `ポモドーロタイマーを開始します。${workTime}分後に作業時間が終了します。`,
      );

      for (let i = 0; i < repeatTimes; i++) {
        // 作業時間待機
        await sleep(minutesToMilliseconds(workTime));
        await interaction.followUp(
          `作業時間が終了しました。${breakTime}分間の休憩を取ってください。`,
        );

        // 休憩時間待機
        await sleep(minutesToMilliseconds(breakTime));
        await interaction.followUp(
          '休憩時間が終了しました。再度作業を開始してください。',
        );
      }
    } catch (error) {
      console.error(`エラーが発生しました: ${error}`);
      await interaction.reply('エラーが発生しました。');
    }
  },
};
