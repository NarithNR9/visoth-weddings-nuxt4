export function useDirectus() {
  const config = useRuntimeConfig();
  const baseUrl = config.public.directusUrl as string;
  const token = config.public.directusToken as string;

  function directusFetch<T>(
    endpoint: string,
    params?: Record<string, string>,
  ): Promise<T> {
    const url = `${baseUrl}${endpoint}`;
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return $fetch<T>(url, {
      headers,
      params,
    });
  }

  async function getWeddingSettings(): Promise<WeddingSettings> {
    const res = await directusFetch<DirectusResponse<WeddingSettings[]>>(
      "/items/wedding_settings",
      {
        limit: "1",
      },
    );
    const settings = res.data[0];
    if (!settings) {
      throw createError({
        statusCode: 500,
        statusMessage: "Wedding settings not found",
      });
    }
    return settings;
  }

  async function getCeremonies(): Promise<Ceremony[]> {
    const res = await directusFetch<DirectusResponse<Ceremony[]>>(
      "/items/ceremonies",
      {
        sort: "sort",
      },
    );
    return res.data;
  }

  async function getGallery(): Promise<GalleryItem[]> {
    const res = await directusFetch<DirectusResponse<GalleryItem[]>>(
      "/items/gallery_items",
      {
        sort: "sort",
      },
    );
    return res.data;
  }

  async function getGuest(id: string): Promise<Guest> {
    const res = await directusFetch<DirectusResponse<Guest>>(
      `/items/guests/${id}`,
    );
    return res.data;
  }

  function assetUrl(
    fileId: string,
    transforms?: { width?: number; height?: number; quality?: number },
  ): string {
    if (!fileId) return "";
    let url = `${baseUrl}/assets/${fileId}`;
    const params = new URLSearchParams();
    if (transforms?.width) params.set("width", String(transforms.width));
    if (transforms?.height) params.set("height", String(transforms.height));
    if (transforms?.quality) params.set("quality", String(transforms.quality));
    const qs = params.toString();
    return qs ? `${url}?${qs}` : url;
  }

  return {
    directusFetch,
    getWeddingSettings,
    getCeremonies,
    getGallery,
    getGuest,
    assetUrl,
  };
}
