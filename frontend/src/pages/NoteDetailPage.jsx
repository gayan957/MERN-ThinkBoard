// Import necessary hooks and modules
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"; // for routing and navigation
import api from "../lib/axios"; // axios instance for API requests
import toast from "react-hot-toast"; // toast notifications
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react"; // icons

const NoteDetailPage = () => {
  // States for note data, loading and saving status
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate(); // for programmatic navigation
  const { id } = useParams(); // get note ID from URL

  // Fetch note details when component loads or id changes
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`); // API call to get the note
        setNote(res.data); // update state with response
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note"); // show error toast
      } finally {
        setLoading(false); // set loading false regardless of success or error
      }
    };

    fetchNote();
  }, [id]);

  // Handle delete note
  const handleDelete = async () => {
    // confirm deletion from user
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`); // API call to delete the note
      toast.success("Note deleted");
      navigate("/"); // redirect to home after deletion
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  // Handle save/update note
  const handleSave = async () => {
    // validate title and content
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true); // start saving process

    try {
      await api.put(`/notes/${id}`, note); // API call to update the note
      toast.success("Note updated successfully");
      navigate("/"); // redirect to home after save
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false); // reset saving status
    }
  };

  // Show loading spinner while fetching note
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" /> {/* spinning loader icon */}
      </div>
    );
  }

  // Main component UI
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header: back button and delete button */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          {/* Note edit form */}
          <div className="card bg-base-100">
            <div className="card-body">
              {/* Title input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* Content textarea */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              {/* Save button */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default NoteDetailPage;
