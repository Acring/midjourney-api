import 'dotenv/config';
import { Midjourney } from '../src';
/**
 *
 * a simple example of using the imagine api with ws
 * ```
 * npx tsx example/imagine-ws.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    HuggingFaceToken: <string>process.env.HUGGINGFACE_TOKEN,
    Debug: true,
    Ws: true, // required  `Only you can see this`
    // Remix: false, // required  `Only you can see this`
  });
  await client.Connect(); // required
  const Imagine = await client.Imagine(
    'A paper plane is flying in the sky. --fast --niji 6',
    (uri: string, progress: string) => {
      console.log('Imagine.loading', uri, 'progress', progress);
    }
  );

  console.log({ Imagine });

  if (!Imagine) {
    return;
  }

  const Upscale = await client.Upscale({
    index: 1,
    msgId: <string>Imagine.id,
    hash: <string>Imagine.hash,
    flags: Imagine.flags,
    loading: (uri: string, progress: string) => {
      console.log('Upscale.loading', uri, 'progress', progress);
    },
  });
  console.log({ Upscale });

  if (!Upscale) {
    return null;
  }
  const Upscale2x = await client.AnyCommand({
    msgId: <string>Upscale?.id,
    msg: Upscale,
    opLabel: 'Upscale (Subtle)',
  });

  console.log({ Upscale2x });

  client.Close();
}
main()
  .then(() => {
    // console.log("finished");
    // process.exit(0);
  })
  .catch((err) => {
    console.log('finished');
    console.error(err);
    process.exit(1);
  });
