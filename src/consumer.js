import "dotenv/config";
import amqp from "amqplib";
import PlaylistService from "./PlaylistService.js";
import MailSender from "./MailSender.js";
import Listener from "./listener.js";

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue("export:playlists", { durable: true });
  console.log("Waiting for messages in 'export:playlists' queue...");
  channel.consume(
    "export:playlists",
    (message) => {
      listener.listen(message);
    },
    { noAck: true },
  );

  console.log("Consumer is up and running...");
};

init();
