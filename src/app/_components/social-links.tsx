import Link from "next/link";
import { Button } from "../../components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <>
      <div className="hidden fixed xl:right-16 right-2 bottom-0 lg:flex flex-col items-center justify-between space-y-8">
        <div className="flex flex-col space-y-6">
          <Button
            variant="ghost"
            size="icon"
            className="[&_svg]:size-6"
            asChild
          >
            <Link
              href="https://www.linkedin.com/in/hayata-suenaga/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="[&_svg]:size-6"
            asChild
          >
            <Link
              href="https://github.com/hayata-suenaga"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Link>
          </Button>
        </div>
        <div className="w-1 h-20 bg-foreground" />
      </div>
    </>
  );
}
