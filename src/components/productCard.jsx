export default function ProductCard(props){   // Aluth html tag eka hadunwa denna hadana function ekak nisa palaweni akura capital liwiya yuthuya

    return (
        <div className="productCard">
           <h1>{props.name}</h1>
           <p>{props.price}</p>
           <img className="productImage" src={props.image}/>
           <button>Add to Cart</button>
        </div>
    )
}