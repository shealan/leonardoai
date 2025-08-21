import { Heading, Highlight, Text } from "@chakra-ui/react";

interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <Heading size="3xl" letterSpacing="tight" fontWeight="bold">
      <Highlight query={title}>{title}</Highlight>
      <Text fontSize="sm" color="fg.muted">
        {description}
      </Text>
    </Heading>
  );
};

export default Header;
