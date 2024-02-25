import { Doc } from "@/lib/docs";
import { useSidebar } from "@/lib/sidebar";
import {
  ChevronRightIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

export interface DocBreadcrumbsProps {
  doc: Doc;
}

export function DocBreadcrumbs(props: DocBreadcrumbsProps) {
  const sidebar = useSidebar();
  return (
    <Flex py="2" align="center" gap="1" asChild wrap="nowrap">
      <nav aria-label="Breadcrumbs">
        <Button
          className="xl:hidden"
          variant="ghost"
          onClick={() => sidebar.setIsOpen(!sidebar.isOpen)}
          aria-label="Toggle sidebar"
          aria-controls={sidebar.id}
          aria-expanded={sidebar.isOpen}
        >
          {sidebar.isOpen ? (
            <Cross1Icon width="18" height="18" />
          ) : (
            <HamburgerMenuIcon width="18" height="18" />
          )}
        </Button>
        <ChevronRightIcon width="18" height="18" />
        <Text size="2">{props.doc.section}</Text>
        <ChevronRightIcon width="18" height="18" />
        <Text size="2" aria-current="page" className="whitespace-nowrap">
          {props.doc.title}
        </Text>
      </nav>
    </Flex>
  );
}
