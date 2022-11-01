import { Launch } from "../types/launch";
import styled from "styled-components";
import Placeholder from "../assets/placeholder.svg";
import dayjs from "dayjs";
import { Modal } from "./LaunchPopUp";
import { useState } from "react";

export interface LaunchCardProps {
  launch: Launch;
}

const Card = styled.div`
  margin: 12px;
  padding: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
`;

CardImage.defaultProps = {
  src: Placeholder,
};

export const LaunchCard = ({ launch }: LaunchCardProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Card>
      <CardImage
        src={launch.links.patch.small}
        onClick={() => setOpenModal(!openModal)}
      />
      <p>{launch.name}</p>
      <p>{dayjs(launch.date_utc).format("YYYY, MMMM D, h:mm A")}</p>
      <Modal
        active={openModal}
        hideModal={() => setOpenModal(false)}
        launch={launch}
      />
    </Card>
  );
};
