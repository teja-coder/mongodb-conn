import PerformanceRingComponent from "./PerformanceRingComponent";

const PerformanceMetric = ({title, value, metric=100}) => {

    return (
        <div className="bg-stone-800 w-fit ps-5 pe-5 rounded-lg">
          <div className='p-5'>
            <h1 className='text-left text-xl'>{title}</h1>
            <PerformanceRingComponent value={value}  max={metric} />
          </div>
        </div>
    )
}

export default PerformanceMetric;