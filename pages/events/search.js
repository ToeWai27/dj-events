import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "qs";
export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Result">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.data.length === 0 && <h3>No events to show</h3>}
      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
    </Layout>
  );
}
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $contains: term,
          },
        },
        {
          performers: {
            $contains: term,
          },
        },
        {
          address: {
            $contains: term,
          },
        },
        {
          venue: {
            $contains: term,
          },
        },
      ],
    },
  });
  //   const res = await fetch(
  //     `${API_URL}/api/events?populate=*&filters[name]=${term}`
  //   );
  const res = await fetch(`${API_URL}/api/events?populate=*&${query}`);
  const events = await res.json();
  return {
    props: { events },
  };
}
