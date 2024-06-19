import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-1 md:my-0">
          <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80">
             ▶️ Play
          </button>
          <button className="hidden md:inline-block md:bg-gray-800 mx-2 text-white p-4 px-12 text-xl bg-opacity-100 hover:bg-opacity-80 rounded-lg">
            <FontAwesomeIcon icon={faInfoCircle} style={{ color: 'gray', marginLeft: '10px', cursor: 'pointer', fontSize: '20px' }}/> More Info
          </button>
      </div>
    </div>
  )
}

export default VideoTitle;