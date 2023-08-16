import cn from "classnames";
import { useState } from "react";
import Icon from "../../../../components/Icon";
import VideoModal from "../../../../components/VideoModal";
import styles from "./project.module.css";

const Project = ({ embed, image, title }) => {
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(!modal);
  };
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img className={styles.image} src={image} />
        <div className={styles.overlay}>
          {/* <button onClick={openModal} className={styles.play}>
            <Icon name="play" />
          </button> */}
        </div>
      </div>
      <p className={cn("body-2-bold", styles.title)}>{title}</p>

      {modal ? (
        <section className={cn("background")}>
          <div className={cn("align")}>
            <VideoModal
              embed={`https://www.youtube.com/embed/${embed}`}
              closeModal={closeModal}
              setModal={setModal}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Project;
