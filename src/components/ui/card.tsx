import { memo } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Slide from "../../animations/slide";
import { useInView } from "react-intersection-observer";
import { bufferToBase64 } from "../../utils/imageUtils";

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: ArrayBuffer | null;
}

const MenuItem = memo(({ item }: { item: Item }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "200px 0px",
    delay: 100,
  });

  const imageUrl = item.image ? bufferToBase64(item.image) : "";

  return (
    <Slide>
      <div ref={ref} className="flex justify-center items-center p-2">
        <Card
          sx={{
            maxWidth: 200,
            padding: 0,
            margin: 0,
            transform: "translateZ(0)",
          }}
        >
          <CardActionArea>
            {inView && (
              <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={item.name}
                sx={{
                  height: 140,
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              />
            )}
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ willChange: "transform" }}
              >
                <p>{item.name}</p>
                <p>${item.price}</p>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  willChange: "transform",
                }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Slide>
  );
});

MenuItem.displayName = "MenuItem";

export type { Item };
export default MenuItem;
