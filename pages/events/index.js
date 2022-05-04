import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
export default function EventsPage({ events, page, totalPage }) {
  const PER_PAGE = 2;
  const lastPage = Math.ceil(totalPage / 2);
  return (
    <Layout>
      <h1>Events</h1>
      {events.data.length === 0 && <h3>No events to show</h3>}
      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </Layout>
  );
}
export async function getServerSideProps({ query: { page = 1 } }) {
  console.log(page);
  const start = +page === 1 ? 0 : (+page - 1) * 2;
  const qs = require("qs");
  const query = qs.stringify(
    {
      pagination: {
        start: start,
        limit: 2,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`${API_URL}/api/events?populate=*&${query}`);
  const events = await res.json();

  //fetch total/count
  const totalPage = events.meta.pagination.total;

  return {
    props: { events, page: +page, totalPage },
  };
}
