import { log } from '@livekit/components-core';
import { MediaDeviceMenu, TrackToggle, useMediaDevices } from '@livekit/components-react';
import {
  LocalAudioTrack,
  LocalVideoTrack,
  Track,
  VideoPresets,
  createLocalAudioTrack,
  createLocalVideoTrack,
} from 'livekit-client';
import * as React from 'react';

export type LocalUserChoices = {
    username: string;
    videoEnabled: boolean;
    audioEnabled: boolean;
    videoDeviceId: string;
    audioDeviceId: string;
    language: string;
};

const DEFAULT_USER_CHOICES = {
    username: '',
    videoEnabled: true,
    audioEnabled: true,
    videoDeviceId: '',
    audioDeviceId: '',
    language: 'en-US',
};

const ParticipantPlaceholder = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={320}
        height={320}
        viewBox="0 0 320 320"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M160 180C204.182 180 240 144.183 240 100C240 55.8172 204.182 20 160 20C115.817 20 79.9997 55.8172 79.9997 100C79.9997 144.183 115.817 180 160 180Z"
            fill="white"
            fillOpacity={0.25}
        />
        <path
            d="M97.6542 194.614C103.267 191.818 109.841 192.481 115.519 195.141C129.025 201.466 144.1 205 159.999 205C175.899 205 190.973 201.466 204.48 195.141C210.158 192.481 216.732 191.818 222.345 194.614C262.703 214.719 291.985 253.736 298.591 300.062C300.15 310.997 291.045 320 280 320H39.9997C28.954 320 19.8495 310.997 21.4087 300.062C28.014 253.736 57.2966 214.72 97.6542 194.614Z"
            fill="white"
            fillOpacity={0.25}
        />
    </svg>
);

export type PreJoinProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> & {
    /**
     * This function is called with the `LocalUserChoices` if validation is passed.
     */
    onSubmit?: (values: LocalUserChoices) => void;
    /**
     * Provide your custom validation function. Only if validation is successful the user choices are past to the onSubmit callback.
     */
    onValidate?: (values: LocalUserChoices) => boolean;

    onError?: (error: Error) => void;
    /**
     * Prefill the input form with initial values.
     */
    defaults?: Partial<LocalUserChoices>;
    /**
     * Display a debug window for your convenience.
     */
    debug?: boolean;

    joinLabel?: string;

    micLabel?: string;

    camLabel?: string;

    userLabel?: string;
};

export const PreJoin = (props:PreJoinProps) => {

    return (
        <ParticipantPlaceholder style={{backgroundColor: "#afafd3", stroke: "#afafd3"}} />
    )
}
