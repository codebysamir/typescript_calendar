import React from "react"
import { EventForm } from "../context/ModalsContext"


function eventsObserver(setOverflowingEvents: React.Dispatch<React.SetStateAction<EventForm[]>>, events: EventForm[], setVisibleEvents: React.Dispatch<React.SetStateAction<EventForm[]>>) {
    const observerOptions: IntersectionObserverInit = {
        threshold: 1,
        // root:
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const event = events.find(e => e.id === entry.target.id)
            console.log(event)
            if (!event) return

            if (!entry.isIntersecting) {
                
                setVisibleEvents((prevVisible) => {
                    const isAlreadyVisible = prevVisible.some(ve => ve.id === event?.id);
                    if (isAlreadyVisible) {
                        return prevVisible.filter(ev => ev.id !== event.id);
                    }
                    return prevVisible;
                });

                setOverflowingEvents((prevOverflowing) => {
                    const isAlreadyOverflowing = prevOverflowing.some(ofe => ofe.id === event?.id);
                    if (!isAlreadyOverflowing) {
                        return [...prevOverflowing, event];
                    }
                    return prevOverflowing;
                });

            } else {
                // const event = events.find(e => e.id === entry.target.id)
                // const isAlreadyOverflowing = overflowing.find(ofe => ofe.id === event.id)
                // if (isAlreadyOverflowing) {
                //     console.log(overflowing)
                //     overflowing = overflowing.filter(ev => ev.id !== event.id)
                //     console.log(overflowing)
                //     setOverflowingEvents(overflowing)
                // } else {
                // }
                setOverflowingEvents((prevOverflowing) => {
                    const isAlreadyOverflowing = prevOverflowing.some(ofe => ofe.id === event?.id);
                    if (isAlreadyOverflowing) {
                        return prevOverflowing.filter(ev => ev.id !== event.id);
                    }
                    return prevOverflowing;
                });
                
                setVisibleEvents((prevVisible) => {
                    const isAlreadyVisible = prevVisible.some(ve => ve.id === event?.id);
                    if (!isAlreadyVisible) {
                        return [...prevVisible, event];
                    }
                    return prevVisible;
                });
            }
        })
    }, observerOptions)


    return observer
}

export default eventsObserver