function Star({ fill = "#FFD4D9", className}) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="46" 
            height="46" 
            viewBox="0 0 41 42" 
            fill={fill}
            left="0"
            className={className}
        >
        <path d="M20.2516 0L24.9657 15.8926H40.2207L27.8791 25.7148L32.5932 41.6074L20.2516 31.7852L7.91005 41.6074L12.6241 25.7148L0.282536 15.8926H15.5376L20.2516 0Z" fill={fill}/>
        </svg>
    );
}

export default Star;