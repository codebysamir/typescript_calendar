import { EventForm } from "../context/ModalsContext";

function resizeObserver(visibleArr: EventForm[], overflowingArr: EventForm[], setOverflowingEvents: React.Dispatch<React.SetStateAction<EventForm[]>>, setVisibleEvents: React.Dispatch<React.SetStateAction<EventForm[]>>) {
    // const eventButtonHeight = 22.78
    // const eventButtonBottomPadding = 8
    // const eventButtonFullHeight = eventButtonHeight + eventButtonBottomPadding
   

    const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            const eventsDiv = entry.target;
            const eventButtons = Array.from(eventsDiv.children);
            const eventButtonHeight = 22.78;
            const eventButtonBottomPadding = 8;
            const eventButtonFullHeight = eventButtonHeight + eventButtonBottomPadding;
            const visibleHeight = entry.contentRect.height;

            const newVisible: EventForm[] = [];
            const newOverflowing: EventForm[] = [];

            
            if (visibleHeight >= ((eventButtonFullHeight * eventButtons.length) + eventButtonHeight)) {
                if (overflowingArr.length < 1) return
                console.log(overflowingArr)
                console.log('bigger')
                const event = overflowingArr[0]
                console.log(event)
                const isAlreadyVisible = newVisible?.find(v => v.id === event.id)
                if (isAlreadyVisible) return
                console.log(event)
                newVisible.push(event)
                // newOverflowing.push(event)
                setVisibleEvents(prevArr => [...prevArr, ...newVisible])
                setOverflowingEvents(prevArr => prevArr.filter(prevEv => prevEv.id !== newVisible[0]?.id))
                // newVisible.shift()
                // newOverflowing.shift()
                overflowingArr.shift()
                visibleArr.push(event)
            }
            
            if (visibleHeight < ((eventButtonFullHeight * eventButtons.length) - eventButtonBottomPadding)) {
                if (visibleArr.length < 1) return
                console.log('smaller')
                const event = visibleArr.at(-1)
                if (!event) return
                console.log(event)
                const isAlreadyOverflowing = newOverflowing?.find(of => of.id === event.id)
                if (isAlreadyOverflowing) return
                console.log(event)
                newOverflowing.push(event)
                setOverflowingEvents(prevArr => [...prevArr, ...newOverflowing])
                setVisibleEvents(prevArr => prevArr.filter(prevArr => prevArr.id !== newOverflowing[0]?.id))
                visibleArr.pop()
                overflowingArr.unshift(event)
            }
            
            console.log(newVisible)
            console.log(newOverflowing)
        });

    });
    

    return observer
}

export default resizeObserver