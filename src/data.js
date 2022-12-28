import { Calendar, Hash, Type } from "react-feather";
import { COLORS } from "./constants";

export const MODEL_DATA = [
  {
    id: 1,
    name: "User",
    attributes: [
      {
        id: 1,
        name: "id",
        type: "tertiary",
        required: true
      },
      {
        id: 2,
        name: "name",
        type: "tertiary",
        required: false
      },
      {
        id: 3,
        name: "email",
        type: "tertiary",
        required: false
      }
    ],
    position: {}
  },
  {
    id: 2,
    name: "Lesson",
    attributes: [
      {
        id: 1,
        name: "id",
        type: "tertiary",
        required: true
      }
    ],
    position: {}
  }
];

export const ASSOCIATION_DATA = [
  {
    id: 1,
    ownerId: 1,
    childId: 2
  }
];

export const DEFAULT_ATTRIBUTES = [
  {
    name: "id",
    type: "tertiary",
    dataType: "number",
    required: true
  },
  {
    name: "created",
    dataType: "date",
    type: "tertiary",
    required: true
  },
  {
    name: "updated",
    dataType: "date",
    type: "tertiary",
    required: true
  }
];

function Boolean({ color }) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 1L5 13"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 7L12.0882 7.00002L14.9118 7.00059L15 7.00061"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 10L12.0588 10L13.9412 10.0004L14 10.0004"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 7L12 13"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 1L3 7"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1 1H1.11765L4.88235 1H5"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export const ICONS = {
  date: {
    icon: <Calendar size={14} />
  },
  number: {
    icon: <Hash size={14} />
  },
  string: {
    icon: <Type size={14} />
  },
  boolean: {
    icon: <Boolean color={COLORS.tertiary.dark} />
  }
};
