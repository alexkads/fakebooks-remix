import { prisma } from "~/db.server";

export async function searchCustomers(query: string) {
  const customers = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    where: {
      name: {
        contains: query
      },
      email: {
        contains: query
      }
    }
  });
  const lowerQuery = query.toLowerCase();
  return customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery)
    );
  });
}
