import React, { Component } from 'react';
import NewAudioRecorder from '../Main/NewAudioRecorder';

class Recorder extends Component {

  // State Value
    state = {
        audioDetails: {
        // filename:"",
        // tags:[],
        url: null,
        blob: null,
        chunks: null,
          duration: {
          h: null,
          m: null,
          s: null,
          }
        }
    }

  // Methods for handlers
    handleAudioStop(data){
      console.log(data)
      this.setState({ audioDetails: data });
    }

    handleAudioUpload(file) {
      console.log(file);
    }
    
    handleReset() {
      const reset = {
          url: null,
          blob: null,
          chunks: null,
            duration: {
            h: null,
            m: null,
            s: null,
            }
      }
      this.setState({ audioDetails: reset });
    }

  render() {
    return (
      <div>
        {/* <h1>TEST RECORDER</h1> */}
        <NewAudioRecorder
          record={true}
          title={"New recording"}
          audioURL={this.state.audioDetails.url}
          showUIAudio
          handleAudioStop={data => this.handleAudioStop(data)}
          handleAudioUpload={data => this.handleAudioUpload(data)}
          handleReset={() => this.handleReset()}
          mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
        />
      </div>
    );
  }
}

export default Recorder;