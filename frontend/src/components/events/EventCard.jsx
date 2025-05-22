// src/components/events/EventCard.jsx
import styles from '../../styles/EventCard.module.css';

function EventCard({ event }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{event.name}</h3>
      <p>{event.date}</p>
      <p>{event.location}</p>
    </div>
  );
}
export default EventCard;