import type { NextRequest } from 'next/server'
import { AccessToken, VideoGrant } from 'livekit-server-sdk';

const roomName = 'name-of-room';
const participantName = 'user-name';

const at = new AccessToken('api-key', 'secret-key', {
  identity: participantName,
});

const videoGrant: VideoGrant = {
  room: roomName,
  roomJoin: true,
  canPublish: true,
  canSubscribe: true,
};

at.addGrant(videoGrant);

const token = await at.toJwt();
console.log('access token', token);


// const sleep = (ms: number) => new Promise((resolve, reject) => setTimeout(() => resolve("ok"), ms));

const createToken = async (pname: string) => {
    // If this room doesn't exist, it'll be automatically created when the first
    // participant joins
    const roomName = 'quickstart-room';
    // Identifier to be used for participant.
    // It's available as LocalParticipant.identity with livekit-client SDK
    const participantName = pname;

    const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
        identity: participantName,
        // Token to expire after 3 minutes
        ttl: '3m',
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return await at.toJwt();
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params // 'a', 'b', or 'c'
    const searchParams = request.nextUrl.searchParams
    const pname = searchParams.get('pname') ?? "anonymous"

    if (slug == "gettoken") {
        Response.json(await createToken(pname))
    } else {
        return Response.json({ slug: slug})
    }
}