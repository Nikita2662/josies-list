function Flag({ fill = "#D5F3FF" , text , svgclass , textclass}) {
    return (
        <svg 
            width="1120" 
            height="59" 
            viewBox="0 0 1120 59" 
            fill={fill} 
            xmlns="http://www.w3.org/2000/svg"
            className={svgclass}
        >
        <rect 
            width="1038.9" 
            height="59" 
            fill={fill}
        />
        <path d="M1120 0H1038.9V59H1120L1066.26 30.5412L1120 0Z" fill={fill}/>
        <text
            x="2%"
            y="54%"       
            dominantBaseline="middle"
            className={textclass}
        >
            {text}
        </text>
        </svg>

    );
}

export default Flag;