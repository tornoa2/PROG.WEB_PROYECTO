//import React from 'react';

type DummyGCProps = {
    name: string;
    onAddToCart: (name: string) => void;
};

const DummyGC = ({ name, onAddToCart }: DummyGCProps) => {
    return (
        <div className="col-6 col-md-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <button className="btn btn-primary" onClick={() => onAddToCart(name)}>
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DummyGC;