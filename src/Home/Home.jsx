import { signOut, getAuth } from "firebase/auth"
import './Home.css'
import { useState } from "react";
import { Picx } from "../Components/Picx";
import { closestCenter, DndContext } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove
} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities';

const SortablePicture = ({pic,index}) => {
     const {
        attributes, 
        listeners, 
        setNodeRef, 
        transform, 
        transition} = useSortable( {id: pic.id} );
     const style = {
            transition,
            transform: CSS.Transform.toString(transform)
        }
    return (
        <div 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners} 
        className={
        index === 0? "": 
        index===1? "v-stretch":
        index===2? 'h-stretch':
        index===3? '':
        index===4? '':
        index===5? 'v-stretch':
        index===6? 'big-stretch':
        index===7? '': 
        index===8? 'h-stretch':
        index===9? '':
        index===10? '':
        index===11?'':
        index===12?'v-stretch':
        index===13? '':
        index===14?'big-stretch': ''}>
            <img src={pic.src} alt={pic.alt}/>
        </div>
    )
}

export function Home(){
    const [query, setQuery] = useState('');
    const [pics, setPics] = useState(Picx)


    const auth = getAuth()
    async function handleSignOut(){
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }
    const onDragEnd = event => {
        const {active, over} = event
        if (active.id === over.id) {
            return;
        }
        setPics((pics) => {
            const oldIndex = pics.findIndex((pic) => pic.id === active.id);
            const newIndex = pics.findIndex((pic) => pic.id === over.id);
            return arrayMove(pics, oldIndex, newIndex);
        });
    };

    return (
        <div>
            <header>
            <h3 className="title">THANK YOU HNG</h3>
            <input 
            type="text" 
            placeholder="Search by name of 'animal' e.g. Dog" 
            className="search" 
            onChange={e=>setQuery(e.target.value)}
            />
            <button className="but" onClick={()=>{handleSignOut()}}>Sign Out</button>
            </header>
            <main>
                
                    
                    <div className="grid-wrapper">
                        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                            <SortableContext items={Picx} strategy={verticalListSortingStrategy}>
                        {pics.filter((pic) => 
                        pic.name.toLowerCase().includes(query)
                        ).map((pic, index) => (
                            <SortablePicture key={pic.id} pic={pic} index={index}/>
                        ))}
                        </SortableContext>
                        </DndContext>
                    </div>
                
            </main>
            
        </div>
    )
    
}