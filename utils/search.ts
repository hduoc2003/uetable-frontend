import _ from "lodash"
import strNormalize from "./strNormalize";

export default function search<Data extends object>(
    value: string,
    data: Data[],
    keys: (keyof Data)[]
): Data[] {
    value = strNormalize(value);
    return data.filter((datum) => {
        const concat: string = _.join(_.at(datum, keys))
        return strNormalize(concat).includes(value)
    })
}
