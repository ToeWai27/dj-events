import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/From.module.css";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({ evt }) {
  const router = useRouter();
  const [data, setdata] = useState({
    name: evt.data.attributes.name,
    performers: evt.data.attributes.performers,
    venue: evt.data.attributes.venue,
    address: evt.data.attributes.address,
    date: evt.data.attributes.data,
    time: evt.data.attributes.time,
    description: evt.data.attributes.description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.data.attributes.image.data
      ? evt.data.attributes.image.data.attributes.formats.thumbnail.url
      : null
  );
  const [showModal, setshowModal] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    // const hasEmptyFields = Object.data(data).some((element) => element === "");
    // if (hasEmptyFields) {
    //   // toast("Please fill in all fields");
    //   console.log("Please fill in all fields");
    // }
    const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) {
      console.log("Something went wrong");
    } else {
      const events = await res.json();
      router.push(`/events/${events.data.attributes.slug}`);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/events/${evt.data.id}?populate=*`);
    const data = await res.json();
    console.log(data);

    setshowModal(false);
  };
  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={handelSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={data.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={data.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={data.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(data.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={data.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={data.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={API_URL + imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setshowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setshowModal(false)}>
        <ImageUpload
          evtId={evt.data.id}
          imageUploaded={imageUploaded}
          field={evt.data.attributes.image.data}
        />
      </Modal>
    </Layout>
  );
}
export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const evt = await res.json();
  return {
    props: {
      evt,
    },
  };
}
