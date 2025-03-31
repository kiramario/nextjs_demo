'use client';
import * as React from "react"
import Daily from '@daily-co/daily-js';
import { DailyCall, DailyEventObject } from '@daily-co/daily-js';


type Fbs_MediaStreamTrack = MediaStreamTrack & {
    persistentTrack: MediaStreamTrack
};


// Join the room
class DailyCallManager {

    call: DailyCall
    currentRoomUrl: string
    api_key: string
    personal_info: object

    constructor() {
        console.log("constructor DailyCallManager")
        this.call = Daily.createCallObject();
        this.currentRoomUrl = "";
        this.api_key = "e834125dfc6041eab00afa4200680651"
        this.personal_info = {"persona_id":"pddafb040610","persona_name":"Life Coach","created_at":"2025-03-04T08:17:19.990Z"}
    }

    async CreateConversation() {
        const bodyPayload = {
            "replica_id":"r79e1c033f",
            "persona_id":"pddafb040610",
            // "callback_url":"https://yourwebsite.com/webhook",
            "conversation_name":"Echo my word",
            // "conversational_context":"You are about to talk to Hassaan, one of the cofounders of Tavus. He loves to talk about AI, startups, and racing cars.",
            "custom_greeting":"Hey there Hassaan, long time no see!",
            "properties":{
                "max_call_duration":180,
                "participant_left_timeout":10,
                "participant_absent_timeout":60,
                // "enable_recording":true,
                // "enable_transcription":true,
                // "apply_greenscreen":true,
                "language":"english",
                // "recording_s3_bucket_name":"conversation-recordings",
                // "recording_s3_bucket_region":"us-east-1",
                // "aws_assume_role_arn":""
            }
        }

        const options = {
            method: 'POST',
            headers: {'x-api-key': this.api_key, 'Content-Type': 'application/json'},
            body: JSON.stringify(bodyPayload)
          };
          
          const resPromise = await fetch('https://tavusapi.com/v2/conversations', options)
          const response = await resPromise.json()

          console.log("CreateConversation: ", response)
          return response;
    }

    async GetConversation(conversation_id: string) {
        if (conversation_id.length == 0) {
            alert("provide conversation_id")
            return
        }

        const options = {method: 'GET', headers: {'x-api-key': this.api_key}};

        fetch(`https://tavusapi.com/v2/conversations/${conversation_id}`, options)
            .then(response => response.json())
            .then(response => {
                console.log("GetConversation: ", response)
            })
            .catch(err => console.error(err));
    }

    async ListConversation() {
        const options = {method: 'GET', headers: {'x-api-key': this.api_key}};

        fetch('https://tavusapi.com/v2/conversations', options)
            .then(response => response.json())
            .then(response => {
                console.log("ListConversation: ", response)
            })
            .catch(err => console.error(err));
    }

    async EndConversation(conversation_id: string) {
        if (conversation_id.length == 0) {
            alert("provide conversation_id")
            return
        }
        const options = {method: 'POST', headers: {'x-api-key': this.api_key}};

        fetch(`https://tavusapi.com/v2/conversations/${conversation_id}/end`, options)
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(response => {
                console.log("EndConversation: ", response)
            })
            .catch(err => console.error(err));
    }

    async DeleteConversation(conversation_id: string) {
        if (conversation_id.length == 0) {
            alert("provide conversation_id")
            return
        }
        const options = {method: 'DELETE', headers: {'x-api-key': this.api_key}};

        fetch(`https://tavusapi.com/v2/conversations/${conversation_id}`, options)
            .then(response => response.json())
            .then(response => {
                console.log("DeleteConversation: ", response)}
            )
            .catch(err => console.error(err));
    }

    async joinRoom(roomUrl: string, joinToken = "") {
        if (!roomUrl) {
          alert('Room URL is required to join a room.');
          return;
        }
    
        this.currentRoomUrl = roomUrl;
    
        const joinOptions = { url: roomUrl, token: joinToken};
        if (joinToken.length > 0) {
            joinOptions.token = joinToken;
            console.log('Joining with a token.');
        } else {
            console.log('Joining without a token.');
        }
    
        try {
          // Join the room
          await this.call.join(joinOptions);
        } catch (e) {
          console.error('Join failed:', e);
        }
    }

    async createVideoContainer(participantId: string) {
        // Create a video container for the participant
        const videoContainer = document.createElement('div');
        videoContainer.id = `video-container-${participantId}`;
        videoContainer.className = 'video-container';

        const videlElm: HTMLElement | null = document.getElementById('videos')
        if(videlElm) {
            videlElm.appendChild(videoContainer);
        }
        
        // Add an overlay to display the participant's session ID
        const sessionIdOverlay = document.createElement('div');
        sessionIdOverlay.className = 'session-id-overlay';
        sessionIdOverlay.textContent = participantId;
        videoContainer.appendChild(sessionIdOverlay);

        // Create a video element for the participant
        const videoEl = document.createElement('video');
        videoEl.className = 'video-element';
        videoContainer.appendChild(videoEl);
    }

    async createAudioElement(participantId: string) {
        // Create an audio element for the participant
        const audioEl = document.createElement('audio');
        audioEl.id = `audio-${participantId}`;
        document.body.appendChild(audioEl);
    }

    async destroyTracks(trackTypes: string[], participantId: string) {
        trackTypes.forEach((trackType) => {
          const elementId = `${trackType}-${participantId}`;
          const element: HTMLVideoElement | null = document.getElementById(elementId) as HTMLVideoElement;
          if (element) {
            element.srcObject = null; // Release media resources
            element.parentNode?.removeChild(element); // Remove element from the DOM
          }
        });
      }

    async startOrUpdateTrack(trackType: string, track: MediaStreamTrack, participantId: string) {
        // Construct the selector string or ID based on the trackType.
        const selector =
          trackType === 'video'
            ? `#video-container-${participantId} video.video-element`
            : `audio-${participantId}`;
    
        // Retrieve the specific media element from the DOM.
        const trackEl: HTMLVideoElement | null =
          trackType === 'video'
            ? document.querySelector(selector) as HTMLVideoElement
            : document.getElementById(selector) as HTMLVideoElement;
    
        // Error handling if the target media element does not exist.
        if (!trackEl) {
          console.error(
            `${trackType} element does not exist for participant: ${participantId}`
          );
          return;
        }
    
        // Check for the need to update the media source. This is determined by
        // checking whether the existing srcObject's tracks include the new
        // persistentTrack. If there are no existing tracks or the new track is not
        // among them, an update is necessary.
        const tsms: MediaStream | null = trackEl.srcObject as MediaStream
        const existingTracks = tsms?.getTracks();
        const needsUpdate = !existingTracks?.includes((track as Fbs_MediaStreamTrack).persistentTrack);
    
        // Perform the media source update if needed by setting the srcObject of
        // the target element to a new MediaStream containing the provided
        // persistentTrack.
        if (needsUpdate) {
          trackEl.srcObject = new MediaStream([(track as Fbs_MediaStreamTrack).persistentTrack]);
    
          // Once the media metadata is loaded, attempts to play the track. Error
          // handling for play failures is included to catch and log issues such as
          // autoplay policies blocking playback.
          trackEl.onloadedmetadata = () => {
            trackEl
              .play()
              .catch((e) =>
                console.error(
                  `Error playing ${trackType} for participant ${participantId}:`,
                  e
                )
              );
          };
        }
      }

    async handleParticipantJoinedOrUpdated(event: DailyEventObject) {
        const { participant } = event;
        const participantId = participant.session_id;
        const isLocal = participant.local;
        const tracks = participant.tracks;
        debugger
    
    
        // Create a video container if one doesn't exist
        if (!document.getElementById(`video-container-${participantId}`)) {
          this.createVideoContainer(participantId);
        }
    
        // Create an audio element for non-local participants if one doesn't exist
        if (!document.getElementById(`audio-${participantId}`) && !isLocal) {
          this.createAudioElement(participantId);
        }
        
        console.log("tracks: ", tracks)
        Object.entries(tracks).forEach(([trackType, trackInfo]) => {
            console.log("typeof trackInfo: ", typeof(trackInfo))
            console.log("trackInfo: ", trackInfo)

            
          // If a persistentTrack exists...
          if ((trackInfo as MediaStreamTrack).hasOwnProperty("persistentTrack")) {
            // Check if this is the local participant's audio track.
            // If so, we will skip playing it, as it's already being played.
            // We'll start or update tracks in all other cases.
            if (!(isLocal && trackType === 'audio')) {
                this.startOrUpdateTrack(trackType, (trackInfo as MediaStreamTrack), participantId);
            }
          } else {
            // If the track is not available, remove the media element
            this.destroyTracks([trackType], participantId);
          }
    
    
        // Update the camera and microphone states for the local user based on
        // the track's state
        //   if (isLocal) {
        //     this.updateUiForDevicesState(trackType, trackInfo);
        //   }
        });
      }

    async initListener() {
        this.call.on("app-message", (event)=> {
            console.log("app_message e: ", event)
        })

        // this.call.on("participant-joined", (event)=> {
        //     console.log("participant-joined e: ", event)
        //     this.handleParticipantJoinedOrUpdated(event)
        // })

        this.call.on("participant-updated", (event)=> {
            console.log("participant-updated e: ", event)
            this.handleParticipantJoinedOrUpdated(event)
        })
    }

    async sendMsg(message: string) {
        alert(message)
        const interaction = {
            "message_type": "conversation",
            "event_type": "conversation.echo",
            "conversation_id": "c123456",
            "properties": {
                "modality": "text",
                "text": `${message}`,
                "audio": "base64-encoded-audio",
                "sample_rate": 24000,
                "inference_id": "inference-id-123",
                "done": "true"
            }
          }

        const hi = this.call.sendAppMessage({message: interaction }, '*');
        console.log('Sending message: ', hi);
        console.log('Sent message: ', interaction);
    }
}

// function daily_creat() {
//     let call = Daily.wrap(MY_IFRAME);

// }

const TavusEcho = () => {
    const [convId, setConvId] = React.useState("")
    const [message, setMessage] = React.useState("")
    const callM: React.RefObject<DailyCallManager> = React.useRef({} as DailyCallManager)
    const roomUrl: React.RefObject<string> = React.useRef("")
    const consId: React.RefObject<string> = React.useRef("")

    React.useEffect(() => {
        callM.current = new DailyCallManager()
        callM.current.initListener()
    }, [])


    const createConversation = async () => {
        const dataJ = await callM.current.CreateConversation()
        roomUrl.current = dataJ["conversation_url"]
        consId.current = dataJ["conversation_id"]
        setConvId(consId.current)
        console.log(dataJ)
    }

    const get_conversation = async () => {
        callM.current.GetConversation(convId)
    }

    const list_conversation = async () => {
        callM.current.ListConversation()
    }

    const end_conversation = async () => {
        callM.current.EndConversation(convId)
    }

    const delete_conversation = async () => {
        callM.current.DeleteConversation(convId)
    }

    const join_room = async () => {
        callM.current.joinRoom(roomUrl.current)
    }

    const echo_tavus = async () => {
        callM.current.sendMsg(message)
    }


    return (
        <>
            <div className="flex flex-col justify-between">
                <div className="mt-4">
                    <button
                        onClick={createConversation}
                        id="create_session"
                        className="mr-4 px-4 w-64 py-2 text-black font-bold bg-green-300  rounded-md hover:bg-green-600 transition-colors"
                    >
                        create_conversation
                    </button>

                    <button
                        onClick={join_room}
                        id="create_session"
                        className="mr-4 px-4 w-64 py-2 text-black font-bold bg-green-300  rounded-md hover:bg-green-600 transition-colors"
                    >
                        join_room
                    </button>

                    
                </div>
                <div className="mt-4">
                    <input className="mr-4 border-solid border-2 border-indigo-600 px-4 py-1" value={convId} onChange={(e) => setConvId(e.target.value)} placeholder="conversation id"/>

                    <button
                        onClick={list_conversation}
                        id="create_session"
                        className="mr-4 px-4 py-2 text-black font-bold bg-green-300 rounded-md hover:bg-green-600 transition-colors"
                    >
                        list_conversation
                    </button>

                    <button
                        onClick={get_conversation}
                        id="create_session"
                        className="mr-4 px-4 py-2 text-black font-bold bg-green-300 rounded-md hover:bg-green-600 transition-colors"
                    >
                        get_conversation
                    </button>
                    <button
                        onClick={end_conversation}
                        id="create_session"
                        className="mr-4 px-4 py-2 text-black font-bold bg-green-300 rounded-md hover:bg-green-600 transition-colors"
                    >
                        end_conversation
                    </button>
                    <button
                        onClick={delete_conversation}
                        id="create_session"
                        className="mr-4 px-4 py-2 text-black font-bold bg-green-300 rounded-md hover:bg-green-600 transition-colors"
                    >
                        delete_conversation
                    </button>
                </div>

                <div className="mt-4">
                    <button
                        onClick={echo_tavus}
                        id="create_session"
                        className="mr-4 px-4 w-64 py-2 text-black font-bold bg-green-300  rounded-md hover:bg-green-600 transition-colors"
                    >
                        echo
                    </button>

                    <textarea
                        className="mr-4 border-solid border-2 border-indigo-600 px-4 py-1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                   
                </div>

                <div id="videos"></div>
                
            </div>
            
        </>
    )
}

export default function Page() {
    return (
        <>
            <h1>tarvus demo</h1>
            {/* <LocalAudioVedio /> */}

            <TavusEcho />
        </>
    )
}