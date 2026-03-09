class Listener {
  constructor(PlaylistService, MailSender) {
    this._playlistService = PlaylistService;
    this._mailSender = MailSender;
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString(),
      );
      const playlist = await this._playlistService.getPlaylist(playlistId);
      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlist),
      );
      console.log("Email sent:", result);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }
}

export default Listener;
