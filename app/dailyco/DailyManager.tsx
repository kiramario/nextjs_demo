// import * as React from "react"
import Daily from '@daily-co/daily-js';
import { DailyCall, DailyEventObject } from '@daily-co/daily-js';


const getCurTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedTime
}

export default class DailyCallManager {
    call: DailyCall
    currentRoomUrl: string
    // api_key: string
    // personal_info: object

    localMedialStream: MediaStream

    constructor() {
        console.log(getCurTime() + " :constructor DailyCallManager")
        this.call = Daily.createCallObject();
        this.currentRoomUrl = "https://linghu.daily.co/linghu_demo";
        // this.api_key = "e834125dfc6041eab00afa4200680651"
        // this.personal_info = {"persona_id":"pddafb040610","persona_name":"Life Coach","created_at":"2025-03-04T08:17:19.990Z"}
        this.localMedialStream = {} as MediaStream

        this.initialize();
    }

    async initialize() {
        this.setupEventListeners();
    }

    toggleCamera() {
        console.log(getCurTime() + ": toggleCamera")
        console.log(this.call.localVideo())
        this.call.setLocalVideo(!this.call.localVideo());
    }

    toggleAudio() {
        console.log(getCurTime() + ": toggleAudio")
        this.call.setLocalAudio(!this.call.localAudio());
    }

    private setupEventListeners() {
        this.call.on('joined-meeting', this.handleJoin)

        this.call.on("app-message", (event)=> {
            console.log(getCurTime() + ": app-message")
            console.log("app_message e: ", event)
        })

        this.call.on("participant-updated", (event)=> {
            console.log(getCurTime() + ": participant-updated")
            console.log("participant-updated e: ", event)

            this.handleParticipantJoinedOrUpdated(event)
        })

        this.call.on("participant-joined", (event)=> {
            console.log(getCurTime() + ": participant-joined")
            console.log("participant-joined e: ", event)

            this.handleParticipantJoinedOrUpdated(event)
        })
    }

    private handleJoin(event: DailyEventObject) {
        console.log(getCurTime() + ": handleJoin")
        console.log("handleJoin: ", event)

        const tracks = event.participants.local.tracks;

        // tracks里面是怎么构造的？
        console.log("tracks: ", tracks)

        const combine: MediaStreamTrack[] = []

        Object.entries(tracks).forEach(([trackType, trackInfo]) => {
            if (trackType == "video" || trackType == "audio") {
                combine.push(trackInfo as MediaStreamTrack)
            }
        });

        this.localMedialStream = new MediaStream(combine)

        this.setupDeviceSelectors()
    }

    private handleParticipantJoinedOrUpdated(event: DailyEventObject) {
        console.log(event)
    }

    private async setupDeviceSelectors() {
        // Fetch current input devices settings and an array of available devices.
        const selectedDevices = await this.call.getInputDevices();
        console.log(getCurTime() + ": getInputDevices")
        console.log(selectedDevices)

        const a = await this.call.enumerateDevices();
        console.log(getCurTime() + ": enumerateDevices")
        console.log(a)
    }
    
    async closeRoom(roomUrl: string, joinToken = "") {
        console.log(roomUrl)
        console.log(joinToken)
    }

    async leaveRoom() {
        console.log(getCurTime() + ": leaveRoom")
        this.call.leave();
    }
    

    async joinRoom(roomUrl: string, joinToken = "") {
        console.log(getCurTime() + ": joinRoom")

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

}