import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function MainCard({ data }) {
  return (
    <Card
      className={`mt-6 ${data.bg} w-[220px] h-[120px] p-[15px] relative text-black`}
    >
      <CardBody className="!p-0">
        {/* <RocketLaunchIcon className="text-blue-500 w-5 h-5 mb-4" /> */}
        {data.svg}
        <div className="pt-[2rem]">
          <Typography variant="p" color="blue-gray" className="mb-2 text-sm">
            {data.heading}
          </Typography>
          <Typography variant="h5">{data.amount}</Typography>
        </div>
      </CardBody>
      {/* <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button size="sm" variant="text" className="flex items-center gap-2">
            Learn More
            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
          </Button>
        </a>
      </CardFooter> */}
    </Card>
  );
}
