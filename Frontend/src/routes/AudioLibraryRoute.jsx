import { Route, Navigate } from "react-router-dom";
import AudioLibrary from "../pages/studioPages/AudioLibrary";
import Music from "../pages/AudioLibraryPages/Music";
import SoundEffects from "../pages/AudioLibraryPages/SoundEffects";
import  Starred from "../pages/AudioLibraryPages/Starred";

const AudioLibraryRoute = () => {
  return (
    <Route path="channel/:id/audio/library" element={<AudioLibrary/>}>
        <Route  index element={<Navigate to="music" replace/> }/>
        <Route path="music" element={<Music/>}/>
        <Route path="sound-effects" element={<SoundEffects/>}/>
        <Route path="starred" element={<Starred/>}/>
    </Route>
  )
}

export default AudioLibraryRoute