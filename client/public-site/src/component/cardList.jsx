
import Card from "./card";

const CardList = (props) => {
    let { allMenu } = props
    // console.log(allMenu);
    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {allMenu.map((el, idx) =>
                    <Card
                        el={el}
                        idx={idx}
                        key={idx}
                    />
                )}
            </div>
        </>
    )
}

export default CardList