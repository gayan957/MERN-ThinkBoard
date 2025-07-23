import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/util";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({note, setNotes}) => {

    const handleDelete = async (e, id) => {
        e.preventDefault(); // get rid of the navigation behaviour

        if(!window.confirm("Are you sure want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id)) //get rid of deleted one from the array
            toast.success("Note deleted succsessfully");
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Faild to delete note");
        }
    }
    return (
        <Link to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>

                <div className="card-action flex justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(note.createdAt)}
                    </span>

                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4 text-primary" />
                        <button className="btn btn-ghost btn-xs text-error p-1" onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>

            </div>
        </Link>
    )
};

export default NoteCard