// for limited and defined permissions the config file for permission list and routes has been created for more advanced/ dynamic requirements db tables for permisions could be created

export const permissionsList = {
  admin: {
    user: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true,
    },
    artist: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true,
    },
    song: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true,
    },
    csv: {
      download: true,
      upload: true,
    },
  },
  super_admin: {
    user: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true,
    },
    artist: {
      Create: false,
      Read: true,
      Update: false,
      Delete: false,
    },
    song: {
      Create: false,
      Read: true,
      Update: false,
      Delete: false,
    },
    csv: {
      download: false,
      upload: false,
    },
  },
  artist_manager: {
    user: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    artist: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true,
    },
    song: {
      Create: false,
      Read: true,
      Update: false,
      Delete: false,
    },
    csv: {
      download: true,
      upload: true,
    },
  },
  artist: {
    user: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    artist: {
      Create: false,
      Read: true,
      Update: false,
      Delete: false,
    },
    song: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true,
    },
    csv: {
      download: false,
      upload: false,
    },
  },
};

export const routeRoles = {
  "/": ["admin", "super_admin"],
  "/users/create": ["admin", "super_admin"],
  "/artists": ["admin", "super_admin", "artist_manager", "artist"],
  "/artists/create": ["admin", "artist_manager"],
  "/music": ["admin", "super_admin", "artist_manager", "artist"],
  "/music/create": ["admin", "artist"],
};
