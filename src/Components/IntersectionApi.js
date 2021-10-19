import React, { useEffect, useState } from 'react'
import vid1 from './Videos/1.mov'
import vid2 from './Videos/2.mov';
import Video from './Video.js';

function IntersectionApi() {
    const[sources,setSources]=useState([{url:vid1},{url:vid2},{url:vid1},{url:vid2}])
    const callback = (entries)=>{ // enteries is an array 
        entries.forEach(element => {
            console.log(element);
            let el = element.target.childNodes[0];
            el.play().then(()=>{ // e1.play() is an asynchronous function which is a Promise
                //if this video is not in viewport, then pause it
                if(!el.paused && !element.isIntersecting)
                {
                    el.pause();  // e1.pause() is Synchronous Function        
                }
            })
 
        });
    }
    const observer = new IntersectionObserver(callback,{
        threshold:0.9
    })
    useEffect(()=>{  // This is equivalent to ComponentDidMount
        console.log('Effect');
        let elements = document.querySelectorAll('.videos')
        elements.forEach(el=>{
            observer.observe(el)
        })
 
    },[])
    return (
        <div className='video-container' >
            <div className='videos'>
                <Video source={sources[0].url} />  {/* Here Video is a component */}
            </div>
            <div className='videos'>
                <Video source={sources[1].url} />
            </div>
            <div className='videos'>
                <Video source={sources[2].url} />
            </div>
            <div className='videos'>
                <Video source={sources[3].url} />
            </div>
 
        </div>
    )
}

export default IntersectionApi
