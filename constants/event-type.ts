import { VideoCallSoftware } from "@prisma/client";

export const eventTypeDurations = [
  {
    label: "30 mins",
    value: 30,
  },
  {
    label: "45 mins",
    value: 45,
  },
  {
    label: "1 hour",
    value: 60,
  },
];

export const videoCallProviders: {
  label: string;
  value: VideoCallSoftware;
}[] = [
  {
    label: "Zoom Meeting",
    value: "ZoomMeeting",
  },
  {
    label: "Google Meet",
    value: "GoogleMeet",
  },
  {
    label: "Microsoft Teams",
    value: "MicrosoftTeams",
  },
];

const videoCallSoftwareMap = {
  ZoomMeeting: "Zoom Meeting",
  GoogleMeet: "Google Meet",
  MicrosoftTeams: "Microsoft Teams",
};

export const getMappedVideoCallSoftware = (
  value: keyof typeof videoCallSoftwareMap
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  return videoCallSoftwareMap[value];
};
