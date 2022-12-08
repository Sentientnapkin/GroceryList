import sanityClient from "@sanity/client";

const config = {
  dataset: 'production',
  projectId: 'x7akirhb',
  apiVersion: "2021-04-28",
  token: 'skDIgOZUOpeDC6cAvWbNxb7A0bwFJMimNhJhreMjgBrH2ripmjkPWlYcqsHKCfUbgdSb6OwvZdERSFFJV7MNV0FcBgm44MHECpduQuMd5Qf9SHKnp1uOhDbdTXytkTNDvoqoXZ0tfYTW73eBqvtzpDRrJJWRSGf5IrYvt0MnOjSKb9JIR2ZI',
  useCdn: false,
};

const client = sanityClient(config);

export default client;