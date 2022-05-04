import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
export default function EventPage({ evt }) {
  const router = useRouter();
  const deleteEvent = async (e) => {
    {
      evt.events.data.map(async (ee) => {
        if (confirm("Are you sure")) {
          const res = await fetch(`${API_URL}/api/events/${ee.id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            router.push("/events");
          }
        }
      });
    }
  };

  return (
    <Layout>
      {evt.events.data.map((evet) => (
        <div className={styles.event} key={evet.id}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${evet.id}`}>
              <a>
                <FaPencilAlt />
                Edit Event
              </a>
            </Link>
            <a href="#" className={styles.delete} onClick={deleteEvent}>
              <FaTimes />
              Delete Event
            </a>
          </div>
          <span>
            {new Date(evet.attributes.date).toLocaleDateString("en-US")} at{" "}
            {evet.attributes.time}
          </span>
          <h1>{evet.attributes.name}</h1>
          {evet.attributes.image && (
            <div className={styles.image}>
              <Image
                src={
                  evet.attributes.image.data
                    ? API_URL +
                      evet.attributes.image.data.attributes.formats.large.url
                    : "/images/event-default.png"
                }
                width={960}
                height={600}
              />
            </div>
          )}
          <h3>Performers:</h3>
          <p>{evet.attributes.performers}</p>
          <h3>Description:</h3>
          <p>{evet.attributes.description}</p>
          <h3>Venue:{evet.attributes.venue}</h3>
          <p>{evet.attributes.address}</p>
          <Link href="/events">
            <a className={styles.back}>{"<"} Go Back</a>
          </Link>
        </div>
      ))}
    </Layout>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();
  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return { paths, fallback: true };
}
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug]=${slug}&populate=*`
  );
  const events = await res.json();
  // const events = JSON.stringify(res);
  return {
    props: {
      evt: { events },
    },
  };
}
// export async function getServerSideProps({ }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
