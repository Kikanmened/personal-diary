export default function EntryCard({ title, date, imageURL, content, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="card bg-base-100 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition overflow-hidden text-left w-full"
    >
      <figure className="aspect-[4/3] overflow-hidden bg-base-200">
        <img
          src={imageURL}
          alt={title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </figure>
      <div className="card-body gap-1">
        <time className="text-sm text-secondary">{date}</time>
        <h2 className="card-title font-display text-lg">{title}</h2>
      </div>
    </button>
  )
}
