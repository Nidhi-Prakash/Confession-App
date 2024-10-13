import { useEffect, useState } from "react";
import { LiaLinkedinIn } from "react-icons/lia";
import { BsGithub } from "react-icons/bs";

export default function ConfessionApp() {
  const [title, setTitle] = useState("");
  const [confession, setConfession] = useState("");
  const [confessions, setConfessions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ title: "", confession: "" });
  const [newConfessionId, setNewConfessionId] = useState(null);

  const GET_CONFESSIONS_URL =
    "https://zyy44ecr46.execute-api.us-east-1.amazonaws.com/dev";
  const ADD_CONFESSION_URL =
    "https://3hxft73hv1.execute-api.us-east-1.amazonaws.com/dev";

  const getConfession = async () => {
    try {
      const response = await fetch(GET_CONFESSIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setConfessions((prevItems) => [...prevItems, ...result.body.Items]);
      return result;
    } catch (error) {
      console.error("Error fetching confessions:", error);
    }
  };

  const postConfession = async (title, confession) => {
    if (!title || !confession) {
      setErrors({
        title: !title ? "Title cannot be empty." : "",
        confession: !confession ? "Confession cannot be empty." : "",
      });
      return;
    }

    const data = {
      title,
      confession,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(ADD_CONFESSION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const newConfession = JSON.parse(result.body);

      setNewConfessionId(newConfession.id);
      setConfessions((prevItems) => [
        {
          ...newConfession,
        },
        ...prevItems,
      ]);

      setTitle("");
      setConfession("");
      setErrors({ title: "", confession: "" });
    } catch (error) {
      console.error("Error submitting confession:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postConfession(title, confession);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getConfession();
      if (result) {
        const sortedConfessions = result.body.Items.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setConfessions(sortedConfessions);
      }
    };

    fetchData();
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) {
      return `Just now`;
    } else if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6 border border-gray-700">
          <div className="bg-indigo-800 p-4 flex justify-between items-center">
            <a
              href="https://www.linkedin.com/in/nidhi-p-89090b211/"
              target="_blank"
              rel="noreferrer"
            >
              <LiaLinkedinIn style={{ height: "30px", width: "30px" }} />
            </a>
            <span className="text-2xl font-bold text-center text-white">
              I'm listening
            </span>
            <a
              href="https://github.com/Nidhi-Prakash"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub style={{ height: "30px", width: "30px" }} />
            </a>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your confession"
                  className="block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 placeholder-gray-400"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confession"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Confession
                </label>
                <textarea
                  id="confession"
                  value={confession}
                  onChange={(e) => setConfession(e.target.value)}
                  placeholder="Write your confession here"
                  rows="4"
                  className="block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 placeholder-gray-400"
                />
                {errors.confession && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confession}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting && <div className="loader mr-2" />}
                Submit Confession
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          {confessions.map((conf) => (
            <div
              key={conf.id}
              className={`bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-700 ${
                newConfessionId === conf.id ? "animate-new-confession" : ""
              }`}
            >
              <div className="bg-gray-700 p-4 border-b border-gray-600">
                <h2 className="text-xl font-semibold text-white flex justify-between items-center">
                  <span>{conf.title}</span>
                  <span className="text-gray-400 text-sm">
                    {formatTimeAgo(conf.timestamp)}
                  </span>
                </h2>
              </div>
              <div className="p-4">
                <p className="text-gray-300">{conf.confession}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
