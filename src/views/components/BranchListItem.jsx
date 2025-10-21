import { useState } from "react";
import { useBranchStore } from "../../controllers"

export const BranchListItem = ({ id, nombre:name, direccion:location }) => {

    const { setActiveBranch, activeBranch } = useBranchStore();

    const onClickActiveBranch = () => {
        setActiveBranch( { id,  name, location } );
    }

    const isActive = activeBranch && activeBranch.id === id;

    return (

        <ul className="list-group list-group-horizontal ms-4 me-4 ">
                
            <li className={ `list-group-item list-group-item-action w-100 ${isActive ? 'active' : ''}` }  
                                onClick={ onClickActiveBranch }>
                <div className="container text-center">
                    <div className="row align-items-start">

                        <div className="col-1 "> { id } </div>
                        <div className="col"> { name } </div>
                        <div className="col"> { location } </div>

                    </div>
                </div>
            </li>
            
        </ul>

    )



}
