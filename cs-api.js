
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Codesphere Public API",
      "version": "0.1.0"
    },
    "paths": {
      "/domains/team/{teamId}/domain/{domainName}": {
        "get": {
          "summary": "getDomain",
          "tags": [
            "domains"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "domainName",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "A valid FQDN.",
                "example": "foo.example.com"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "teamId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "dataCenterId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "workspaces": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "array",
                          "items": {
                            "type": "integer",
                            "minimum": 0
                          }
                        }
                      },
                      "name": {
                        "type": "string"
                      },
                      "certificateRequestStatus": {
                        "type": "object",
                        "properties": {
                          "issued": {
                            "type": "boolean"
                          },
                          "reason": {
                            "type": "string",
                            "nullable": true
                          }
                        },
                        "required": [
                          "issued",
                          "reason"
                        ]
                      },
                      "dnsEntries": {
                        "type": "object",
                        "properties": {
                          "a": {
                            "type": "string"
                          },
                          "cname": {
                            "type": "string"
                          },
                          "txt": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "a",
                          "cname",
                          "txt"
                        ]
                      },
                      "domainVerificationStatus": {
                        "type": "object",
                        "properties": {
                          "verified": {
                            "type": "boolean"
                          },
                          "reason": {
                            "type": "string",
                            "nullable": true
                          }
                        },
                        "required": [
                          "verified",
                          "reason"
                        ]
                      },
                      "customConfigRevision": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "customConfig": {
                        "type": "object",
                        "properties": {
                          "maxBodySizeMb": {
                            "type": "number"
                          },
                          "maxConnectionTimeoutS": {
                            "type": "number"
                          },
                          "useRegex": {
                            "type": "boolean"
                          },
                          "restricted": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "required": [
                      "teamId",
                      "dataCenterId",
                      "workspaces",
                      "name",
                      "certificateRequestStatus",
                      "dnsEntries",
                      "domainVerificationStatus"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Domain not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "domains-getDomain"
        },
        "post": {
          "summary": "createDomain",
          "tags": [
            "domains"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "domainName",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "A valid FQDN.",
                "example": "foo.example.com"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "teamId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "dataCenterId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "workspaces": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "array",
                          "items": {
                            "type": "integer",
                            "minimum": 0
                          }
                        }
                      },
                      "name": {
                        "type": "string"
                      },
                      "certificateRequestStatus": {
                        "type": "object",
                        "properties": {
                          "issued": {
                            "type": "boolean"
                          },
                          "reason": {
                            "type": "string",
                            "nullable": true
                          }
                        },
                        "required": [
                          "issued",
                          "reason"
                        ]
                      },
                      "dnsEntries": {
                        "type": "object",
                        "properties": {
                          "a": {
                            "type": "string"
                          },
                          "cname": {
                            "type": "string"
                          },
                          "txt": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "a",
                          "cname",
                          "txt"
                        ]
                      },
                      "domainVerificationStatus": {
                        "type": "object",
                        "properties": {
                          "verified": {
                            "type": "boolean"
                          },
                          "reason": {
                            "type": "string",
                            "nullable": true
                          }
                        },
                        "required": [
                          "verified",
                          "reason"
                        ]
                      },
                      "customConfigRevision": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "customConfig": {
                        "type": "object",
                        "properties": {
                          "maxBodySizeMb": {
                            "type": "number"
                          },
                          "maxConnectionTimeoutS": {
                            "type": "number"
                          },
                          "useRegex": {
                            "type": "boolean"
                          },
                          "restricted": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "required": [
                      "teamId",
                      "dataCenterId",
                      "workspaces",
                      "name",
                      "certificateRequestStatus",
                      "dnsEntries",
                      "domainVerificationStatus"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "domains-createDomain"
        },
        "patch": {
          "summary": "updateDomain",
          "tags": [
            "domains"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "domainName",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "A valid FQDN.",
                "example": "foo.example.com"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "maxBodySizeMb": {
                      "type": "number"
                    },
                    "maxConnectionTimeoutS": {
                      "type": "number"
                    },
                    "useRegex": {
                      "type": "boolean"
                    },
                    "restricted": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "teamId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "dataCenterId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "workspaces": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "array",
                          "items": {
                            "type": "integer",
                            "minimum": 0
                          }
                        }
                      },
                      "name": {
                        "type": "string"
                      },
                      "certificateRequestStatus": {
                        "type": "object",
                        "properties": {
                          "issued": {
                            "type": "boolean"
                          },
                          "reason": {
                            "type": "string",
                            "nullable": true
                          }
                        },
                        "required": [
                          "issued",
                          "reason"
                        ]
                      },
                      "dnsEntries": {
                        "type": "object",
                        "properties": {
                          "a": {
                            "type": "string"
                          },
                          "cname": {
                            "type": "string"
                          },
                          "txt": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "a",
                          "cname",
                          "txt"
                        ]
                      },
                      "domainVerificationStatus": {
                        "type": "object",
                        "properties": {
                          "verified": {
                            "type": "boolean"
                          },
                          "reason": {
                            "type": "string",
                            "nullable": true
                          }
                        },
                        "required": [
                          "verified",
                          "reason"
                        ]
                      },
                      "customConfigRevision": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "customConfig": {
                        "type": "object",
                        "properties": {
                          "maxBodySizeMb": {
                            "type": "number"
                          },
                          "maxConnectionTimeoutS": {
                            "type": "number"
                          },
                          "useRegex": {
                            "type": "boolean"
                          },
                          "restricted": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "required": [
                      "teamId",
                      "dataCenterId",
                      "workspaces",
                      "name",
                      "certificateRequestStatus",
                      "dnsEntries",
                      "domainVerificationStatus"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Domain not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "409": {
              "description": "Another request is in progress.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          409
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "domains-updateDomain"
        },
        "delete": {
          "summary": "deleteDomain",
          "tags": [
            "domains"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "domainName",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "A valid FQDN.",
                "example": "foo.example.com"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Domain not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "domains-deleteDomain"
        }
      },
      "/domains/team/{teamId}": {
        "get": {
          "summary": "listDomains",
          "tags": [
            "domains"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "teamId": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "dataCenterId": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "workspaces": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "array",
                            "items": {
                              "type": "integer",
                              "minimum": 0
                            }
                          }
                        },
                        "name": {
                          "type": "string"
                        },
                        "certificateRequestStatus": {
                          "type": "object",
                          "properties": {
                            "issued": {
                              "type": "boolean"
                            },
                            "reason": {
                              "type": "string",
                              "nullable": true
                            }
                          },
                          "required": [
                            "issued",
                            "reason"
                          ]
                        },
                        "dnsEntries": {
                          "type": "object",
                          "properties": {
                            "a": {
                              "type": "string"
                            },
                            "cname": {
                              "type": "string"
                            },
                            "txt": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "a",
                            "cname",
                            "txt"
                          ]
                        },
                        "domainVerificationStatus": {
                          "type": "object",
                          "properties": {
                            "verified": {
                              "type": "boolean"
                            },
                            "reason": {
                              "type": "string",
                              "nullable": true
                            }
                          },
                          "required": [
                            "verified",
                            "reason"
                          ]
                        },
                        "customConfigRevision": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "customConfig": {
                          "type": "object",
                          "properties": {
                            "maxBodySizeMb": {
                              "type": "number"
                            },
                            "maxConnectionTimeoutS": {
                              "type": "number"
                            },
                            "useRegex": {
                              "type": "boolean"
                            },
                            "restricted": {
                              "type": "boolean"
                            }
                          }
                        }
                      },
                      "required": [
                        "teamId",
                        "dataCenterId",
                        "workspaces",
                        "name",
                        "certificateRequestStatus",
                        "dnsEntries",
                        "domainVerificationStatus"
                      ]
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "domains-listDomains"
        }
      },
      "/domains/team/{teamId}/domain/{domainName}/verify": {
        "post": {
          "summary": "verifyDomain",
          "tags": [
            "domains"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "domainName",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "A valid FQDN.",
                "example": "foo.example.com"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "verified": {
                        "type": "boolean"
                      },
                      "reason": {
                        "type": "string",
                        "nullable": true
                      }
                    },
                    "required": [
                      "verified",
                      "reason"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Domain not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "domains-verifyDomain"
        }
      },
      "/domains/team/{teamId}/domain/{domainName}/workspace-connections": {
        "put": {
          "summary": "updateWorkspaceConnections",
          "tags": [
            "domains"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "domainName",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "A valid FQDN.",
                "example": "foo.example.com"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": {
                    "type": "array",
                    "items": {
                      "type": "integer",
                      "minimum": 0
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "teamId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "dataCenterId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "workspaces": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "array",
                          "items": {
                            "type": "integer",
                            "minimum": 0
                          }
                        }
                      },
                      "name": {
                        "type": "string"
                      },
                      "certificateRequestStatus": {
                        "type": "object",
                        "properties": {
                          "issued": {
                            "type": "boolean"
                          },
                          "reason": {
                            "type": "string",
                            "nullable": true
                          }
                        },
                        "required": [
                          "issued",
                          "reason"
                        ]
                      },
                      "dnsEntries": {
                        "type": "object",
                        "properties": {
                          "a": {
                            "type": "string"
                          },
                          "cname": {
                            "type": "string"
                          },
                          "txt": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "a",
                          "cname",
                          "txt"
                        ]
                      },
                      "domainVerificationStatus": {
                        "type": "object",
                        "properties": {
                          "verified": {
                            "type": "boolean"
                          },
                          "reason": {
                            "type": "string",
                            "nullable": true
                          }
                        },
                        "required": [
                          "verified",
                          "reason"
                        ]
                      },
                      "customConfigRevision": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "customConfig": {
                        "type": "object",
                        "properties": {
                          "maxBodySizeMb": {
                            "type": "number"
                          },
                          "maxConnectionTimeoutS": {
                            "type": "number"
                          },
                          "useRegex": {
                            "type": "boolean"
                          },
                          "restricted": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "required": [
                      "teamId",
                      "dataCenterId",
                      "workspaces",
                      "name",
                      "certificateRequestStatus",
                      "dnsEntries",
                      "domainVerificationStatus"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Domain not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "domains-updateWorkspaceConnections"
        }
      },
      "/managed-services/providers": {
        "get": {
          "summary": "listProviders",
          "tags": [
            "managed-services"
          ],
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "anyOf": [
                        {
                          "type": "object",
                          "properties": {
                            "name": {
                              "title": "ProviderName",
                              "pattern": "^[-a-z0-9_]+$",
                              "type": "string"
                            },
                            "version": {
                              "title": "ProviderVersion",
                              "pattern": "^v[0-9]+$",
                              "type": "string"
                            },
                            "author": {
                              "type": "string"
                            },
                            "category": {
                              "type": "string"
                            },
                            "description": {
                              "type": "string"
                            },
                            "displayName": {
                              "type": "string"
                            },
                            "iconUrl": {
                              "type": "string"
                            },
                            "configSchema": {
                              "type": "object",
                              "description": "JSON Schema"
                            },
                            "detailsSchema": {
                              "type": "object",
                              "description": "JSON Schema"
                            },
                            "secretsSchema": {
                              "type": "object",
                              "description": "JSON Schema"
                            },
                            "plans": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "integer",
                                    "minimum": 0
                                  },
                                  "name": {
                                    "type": "string"
                                  },
                                  "description": {
                                    "type": "string"
                                  },
                                  "parameters": {
                                    "type": "object",
                                    "additionalProperties": {
                                      "type": "object",
                                      "properties": {
                                        "pricedAs": {
                                          "type": "string",
                                          "enum": [
                                            "cpu-tenths",
                                            "free",
                                            "network-bandwidth-mbps",
                                            "ram-mb",
                                            "replicas",
                                            "storage-mb"
                                          ]
                                        },
                                        "schema": {
                                          "type": "object",
                                          "description": "JSON Schema"
                                        }
                                      },
                                      "required": [
                                        "schema"
                                      ]
                                    }
                                  }
                                },
                                "required": [
                                  "id",
                                  "name",
                                  "description",
                                  "parameters"
                                ]
                              }
                            },
                            "backend": {
                              "type": "object",
                              "properties": {
                                "landscape": {
                                  "type": "object",
                                  "properties": {
                                    "gitUrl": {
                                      "type": "string"
                                    },
                                    "ciProfile": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "gitUrl",
                                    "ciProfile"
                                  ]
                                }
                              },
                              "required": [
                                "landscape"
                              ]
                            }
                          },
                          "required": [
                            "name",
                            "version",
                            "author",
                            "category",
                            "description",
                            "displayName",
                            "iconUrl",
                            "configSchema",
                            "detailsSchema",
                            "secretsSchema",
                            "plans",
                            "backend"
                          ]
                        },
                        {
                          "type": "object",
                          "properties": {
                            "name": {
                              "title": "ProviderName",
                              "pattern": "^[-a-z0-9_]+$",
                              "type": "string"
                            },
                            "version": {
                              "title": "ProviderVersion",
                              "pattern": "^v[0-9]+$",
                              "type": "string"
                            },
                            "author": {
                              "type": "string"
                            },
                            "category": {
                              "type": "string"
                            },
                            "description": {
                              "type": "string"
                            },
                            "displayName": {
                              "type": "string"
                            },
                            "iconUrl": {
                              "type": "string"
                            },
                            "configSchema": {
                              "type": "object",
                              "description": "JSON Schema"
                            },
                            "detailsSchema": {
                              "type": "object",
                              "description": "JSON Schema"
                            },
                            "secretsSchema": {
                              "type": "object",
                              "description": "JSON Schema"
                            },
                            "plans": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "integer",
                                    "minimum": 0
                                  },
                                  "name": {
                                    "type": "string"
                                  },
                                  "description": {
                                    "type": "string"
                                  },
                                  "parameters": {
                                    "type": "object",
                                    "additionalProperties": {
                                      "type": "object",
                                      "properties": {
                                        "pricedAs": {
                                          "type": "string",
                                          "enum": [
                                            "cpu-tenths",
                                            "free",
                                            "network-bandwidth-mbps",
                                            "ram-mb",
                                            "replicas",
                                            "storage-mb"
                                          ]
                                        },
                                        "schema": {
                                          "type": "object",
                                          "description": "JSON Schema"
                                        }
                                      },
                                      "required": [
                                        "schema"
                                      ]
                                    }
                                  }
                                },
                                "required": [
                                  "id",
                                  "name",
                                  "description",
                                  "parameters"
                                ]
                              }
                            },
                            "backend": {
                              "type": "object",
                              "properties": {
                                "api": {
                                  "type": "object",
                                  "properties": {
                                    "endpoint": {
                                      "type": "string"
                                    },
                                    "secret": {
                                      "type": "string"
                                    }
                                  },
                                  "required": [
                                    "endpoint"
                                  ]
                                }
                              },
                              "required": [
                                "api"
                              ]
                            }
                          },
                          "required": [
                            "name",
                            "version",
                            "author",
                            "category",
                            "description",
                            "displayName",
                            "iconUrl",
                            "configSchema",
                            "detailsSchema",
                            "secretsSchema",
                            "plans",
                            "backend"
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "operationId": "managed-services-listProviders"
        },
        "post": {
          "summary": "createProvider",
          "tags": [
            "managed-services"
          ],
          "parameters": [],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "title": "ProviderName",
                      "pattern": "^[-a-z0-9_]+$",
                      "type": "string"
                    },
                    "version": {
                      "title": "ProviderVersion",
                      "pattern": "^v[0-9]+$",
                      "type": "string"
                    },
                    "author": {
                      "type": "string"
                    },
                    "category": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "displayName": {
                      "type": "string"
                    },
                    "iconUrl": {
                      "type": "string"
                    },
                    "configSchema": {
                      "type": "object",
                      "description": "JSON Schema"
                    },
                    "detailsSchema": {
                      "type": "object",
                      "description": "JSON Schema"
                    },
                    "secretsSchema": {
                      "type": "object",
                      "description": "JSON Schema"
                    },
                    "plans": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "minimum": 0
                          },
                          "name": {
                            "type": "string"
                          },
                          "description": {
                            "type": "string"
                          },
                          "parameters": {
                            "type": "object",
                            "additionalProperties": {
                              "type": "object",
                              "properties": {
                                "pricedAs": {
                                  "type": "string",
                                  "enum": [
                                    "cpu-tenths",
                                    "free",
                                    "network-bandwidth-mbps",
                                    "ram-mb",
                                    "replicas",
                                    "storage-mb"
                                  ]
                                },
                                "schema": {
                                  "type": "object",
                                  "description": "JSON Schema"
                                }
                              },
                              "required": [
                                "schema"
                              ]
                            }
                          }
                        },
                        "required": [
                          "id",
                          "name",
                          "description",
                          "parameters"
                        ]
                      }
                    },
                    "backend": {
                      "type": "object",
                      "properties": {
                        "landscape": {
                          "type": "object",
                          "properties": {
                            "gitUrl": {
                              "type": "string"
                            },
                            "ciProfile": {
                              "type": "string"
                            }
                          },
                          "required": [
                            "gitUrl",
                            "ciProfile"
                          ]
                        }
                      },
                      "required": [
                        "landscape"
                      ]
                    }
                  },
                  "required": [
                    "name",
                    "version",
                    "author",
                    "category",
                    "description",
                    "displayName",
                    "iconUrl",
                    "configSchema",
                    "detailsSchema",
                    "secretsSchema",
                    "plans",
                    "backend"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "title": "ProviderName",
                        "pattern": "^[-a-z0-9_]+$",
                        "type": "string"
                      },
                      "version": {
                        "title": "ProviderVersion",
                        "pattern": "^v[0-9]+$",
                        "type": "string"
                      },
                      "author": {
                        "type": "string"
                      },
                      "category": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "displayName": {
                        "type": "string"
                      },
                      "iconUrl": {
                        "type": "string"
                      },
                      "configSchema": {
                        "type": "object",
                        "description": "JSON Schema"
                      },
                      "detailsSchema": {
                        "type": "object",
                        "description": "JSON Schema"
                      },
                      "secretsSchema": {
                        "type": "object",
                        "description": "JSON Schema"
                      },
                      "plans": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "minimum": 0
                            },
                            "name": {
                              "type": "string"
                            },
                            "description": {
                              "type": "string"
                            },
                            "parameters": {
                              "type": "object",
                              "additionalProperties": {
                                "type": "object",
                                "properties": {
                                  "pricedAs": {
                                    "type": "string",
                                    "enum": [
                                      "cpu-tenths",
                                      "free",
                                      "network-bandwidth-mbps",
                                      "ram-mb",
                                      "replicas",
                                      "storage-mb"
                                    ]
                                  },
                                  "schema": {
                                    "type": "object",
                                    "description": "JSON Schema"
                                  }
                                },
                                "required": [
                                  "schema"
                                ]
                              }
                            }
                          },
                          "required": [
                            "id",
                            "name",
                            "description",
                            "parameters"
                          ]
                        }
                      },
                      "backend": {
                        "type": "object",
                        "properties": {
                          "landscape": {
                            "type": "object",
                            "properties": {
                              "gitUrl": {
                                "type": "string"
                              },
                              "ciProfile": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "gitUrl",
                              "ciProfile"
                            ]
                          }
                        },
                        "required": [
                          "landscape"
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "version",
                      "author",
                      "category",
                      "description",
                      "displayName",
                      "iconUrl",
                      "configSchema",
                      "detailsSchema",
                      "secretsSchema",
                      "plans",
                      "backend"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "managed-services-createProvider"
        }
      },
      "/managed-services": {
        "post": {
          "summary": "create",
          "tags": [
            "managed-services"
          ],
          "parameters": [],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "config": {
                      "type": "object",
                      "additionalProperties": {
                        "description": "any defined value"
                      }
                    },
                    "name": {
                      "type": "string"
                    },
                    "provider": {
                      "title": "ProviderName",
                      "pattern": "^[-a-z0-9_]+$",
                      "type": "string"
                    },
                    "providerVersion": {
                      "title": "ProviderVersion",
                      "pattern": "^v[0-9]+$",
                      "type": "string"
                    },
                    "plan": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "parameters": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "integer"
                          }
                        }
                      },
                      "required": [
                        "id",
                        "parameters"
                      ]
                    },
                    "secrets": {
                      "type": "object",
                      "additionalProperties": {
                        "description": "any defined value"
                      }
                    },
                    "teamId": {
                      "type": "integer",
                      "minimum": 0
                    }
                  },
                  "required": [
                    "config",
                    "name",
                    "provider",
                    "providerVersion",
                    "plan",
                    "secrets",
                    "teamId"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "UUID",
                        "format": "uuid",
                        "example": "8316ee2f-87f8-424e-b925-7382dc50d662"
                      },
                      "provider": {
                        "title": "ProviderName",
                        "pattern": "^[-a-z0-9_]+$",
                        "type": "string"
                      },
                      "providerVersion": {
                        "title": "ProviderVersion",
                        "pattern": "^v[0-9]+$",
                        "type": "string"
                      },
                      "name": {
                        "title": "alphanumeric with spaces in between (max length 127)",
                        "pattern": "^(?!\\s)[a-zA-Z0-9\\-_\\s]{0,126}[a-zA-Z0-9\\-_]$",
                        "type": "string"
                      },
                      "plan": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "minimum": 0
                          },
                          "parameters": {
                            "type": "object",
                            "additionalProperties": {
                              "type": "integer"
                            }
                          }
                        },
                        "required": [
                          "id",
                          "parameters"
                        ]
                      },
                      "config": {
                        "type": "object",
                        "additionalProperties": {
                          "description": "any defined value"
                        }
                      },
                      "status": {
                        "type": "object",
                        "anyOf": [
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "creating"
                                ]
                              }
                            },
                            "required": [
                              "state"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "updating"
                                ]
                              }
                            },
                            "required": [
                              "state"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "deleted"
                                ]
                              },
                              "deletedAt": {
                                "type": "string",
                                "format": "date-time"
                              }
                            },
                            "required": [
                              "state",
                              "deletedAt"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "deleting"
                                ]
                              },
                              "deletedAt": {
                                "type": "string",
                                "format": "date-time"
                              }
                            },
                            "required": [
                              "state",
                              "deletedAt"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "synchronized"
                                ]
                              },
                              "detailsRef": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "state",
                              "detailsRef"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "unknown"
                                ]
                              }
                            },
                            "required": [
                              "state"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "invalid provider"
                                ]
                              }
                            },
                            "required": [
                              "state"
                            ]
                          }
                        ]
                      }
                    },
                    "required": [
                      "id",
                      "provider",
                      "providerVersion",
                      "name",
                      "plan",
                      "config",
                      "status"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "managed-services-create"
        },
        "get": {
          "summary": "list",
          "tags": [
            "managed-services"
          ],
          "parameters": [
            {
              "name": "team",
              "in": "query",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "UUID",
                          "format": "uuid",
                          "example": "8316ee2f-87f8-424e-b925-7382dc50d662"
                        },
                        "provider": {
                          "title": "ProviderName",
                          "pattern": "^[-a-z0-9_]+$",
                          "type": "string"
                        },
                        "providerVersion": {
                          "title": "ProviderVersion",
                          "pattern": "^v[0-9]+$",
                          "type": "string"
                        },
                        "name": {
                          "title": "alphanumeric with spaces in between (max length 127)",
                          "pattern": "^(?!\\s)[a-zA-Z0-9\\-_\\s]{0,126}[a-zA-Z0-9\\-_]$",
                          "type": "string"
                        },
                        "plan": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "minimum": 0
                            },
                            "parameters": {
                              "type": "object",
                              "additionalProperties": {
                                "type": "integer"
                              }
                            }
                          },
                          "required": [
                            "id",
                            "parameters"
                          ]
                        },
                        "config": {
                          "type": "object",
                          "additionalProperties": {
                            "description": "any defined value"
                          }
                        },
                        "status": {
                          "type": "object",
                          "anyOf": [
                            {
                              "type": "object",
                              "properties": {
                                "state": {
                                  "type": "string",
                                  "enum": [
                                    "creating"
                                  ]
                                }
                              },
                              "required": [
                                "state"
                              ]
                            },
                            {
                              "type": "object",
                              "properties": {
                                "state": {
                                  "type": "string",
                                  "enum": [
                                    "updating"
                                  ]
                                }
                              },
                              "required": [
                                "state"
                              ]
                            },
                            {
                              "type": "object",
                              "properties": {
                                "state": {
                                  "type": "string",
                                  "enum": [
                                    "deleted"
                                  ]
                                },
                                "deletedAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              },
                              "required": [
                                "state",
                                "deletedAt"
                              ]
                            },
                            {
                              "type": "object",
                              "properties": {
                                "state": {
                                  "type": "string",
                                  "enum": [
                                    "deleting"
                                  ]
                                },
                                "deletedAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              },
                              "required": [
                                "state",
                                "deletedAt"
                              ]
                            },
                            {
                              "type": "object",
                              "properties": {
                                "state": {
                                  "type": "string",
                                  "enum": [
                                    "synchronized"
                                  ]
                                },
                                "detailsRef": {
                                  "type": "string"
                                }
                              },
                              "required": [
                                "state",
                                "detailsRef"
                              ]
                            },
                            {
                              "type": "object",
                              "properties": {
                                "state": {
                                  "type": "string",
                                  "enum": [
                                    "unknown"
                                  ]
                                }
                              },
                              "required": [
                                "state"
                              ]
                            },
                            {
                              "type": "object",
                              "properties": {
                                "state": {
                                  "type": "string",
                                  "enum": [
                                    "invalid provider"
                                  ]
                                }
                              },
                              "required": [
                                "state"
                              ]
                            }
                          ]
                        }
                      },
                      "required": [
                        "id",
                        "provider",
                        "providerVersion",
                        "name",
                        "plan",
                        "config",
                        "status"
                      ]
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "managed-services-list"
        }
      },
      "/managed-services/{id}": {
        "delete": {
          "summary": "delete",
          "tags": [
            "managed-services"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "UUID",
                "format": "uuid",
                "example": "8316ee2f-87f8-424e-b925-7382dc50d662"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Managed service not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "managed-services-delete"
        },
        "get": {
          "summary": "getDetails",
          "tags": [
            "managed-services"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "UUID",
                "format": "uuid",
                "example": "8316ee2f-87f8-424e-b925-7382dc50d662"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "additionalProperties": {
                      "description": "any defined value"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Managed service not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "managed-services-getDetails"
        },
        "patch": {
          "summary": "update",
          "tags": [
            "managed-services"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "description": "UUID",
                "format": "uuid",
                "example": "8316ee2f-87f8-424e-b925-7382dc50d662"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "config": {
                      "type": "object",
                      "additionalProperties": {
                        "description": "any defined value"
                      }
                    },
                    "secrets": {
                      "type": "object",
                      "additionalProperties": {
                        "description": "any defined value"
                      }
                    },
                    "name": {
                      "type": "string"
                    },
                    "plan": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "parameters": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "integer"
                          }
                        }
                      },
                      "required": [
                        "id",
                        "parameters"
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "UUID",
                        "format": "uuid",
                        "example": "8316ee2f-87f8-424e-b925-7382dc50d662"
                      },
                      "provider": {
                        "title": "ProviderName",
                        "pattern": "^[-a-z0-9_]+$",
                        "type": "string"
                      },
                      "providerVersion": {
                        "title": "ProviderVersion",
                        "pattern": "^v[0-9]+$",
                        "type": "string"
                      },
                      "name": {
                        "title": "alphanumeric with spaces in between (max length 127)",
                        "pattern": "^(?!\\s)[a-zA-Z0-9\\-_\\s]{0,126}[a-zA-Z0-9\\-_]$",
                        "type": "string"
                      },
                      "plan": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "minimum": 0
                          },
                          "parameters": {
                            "type": "object",
                            "additionalProperties": {
                              "type": "integer"
                            }
                          }
                        },
                        "required": [
                          "id",
                          "parameters"
                        ]
                      },
                      "config": {
                        "type": "object",
                        "additionalProperties": {
                          "description": "any defined value"
                        }
                      },
                      "status": {
                        "type": "object",
                        "anyOf": [
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "creating"
                                ]
                              }
                            },
                            "required": [
                              "state"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "updating"
                                ]
                              }
                            },
                            "required": [
                              "state"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "deleted"
                                ]
                              },
                              "deletedAt": {
                                "type": "string",
                                "format": "date-time"
                              }
                            },
                            "required": [
                              "state",
                              "deletedAt"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "deleting"
                                ]
                              },
                              "deletedAt": {
                                "type": "string",
                                "format": "date-time"
                              }
                            },
                            "required": [
                              "state",
                              "deletedAt"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "synchronized"
                                ]
                              },
                              "detailsRef": {
                                "type": "string"
                              }
                            },
                            "required": [
                              "state",
                              "detailsRef"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "unknown"
                                ]
                              }
                            },
                            "required": [
                              "state"
                            ]
                          },
                          {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "invalid provider"
                                ]
                              }
                            },
                            "required": [
                              "state"
                            ]
                          }
                        ]
                      }
                    },
                    "required": [
                      "id",
                      "provider",
                      "providerVersion",
                      "name",
                      "plan",
                      "config",
                      "status"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Managed service not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "managed-services-update"
        }
      },
      "/metadata/datacenters": {
        "get": {
          "summary": "getDatacenters",
          "tags": [
            "metadata"
          ],
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "name": {
                          "type": "string"
                        },
                        "city": {
                          "type": "string"
                        },
                        "countryCode": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "id",
                        "name",
                        "city",
                        "countryCode"
                      ]
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "metadata-getDatacenters"
        }
      },
      "/metadata/workspace-plans": {
        "get": {
          "summary": "getWorkspacePlans",
          "tags": [
            "metadata"
          ],
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "priceUsd": {
                          "type": "number"
                        },
                        "title": {
                          "type": "string"
                        },
                        "deprecated": {
                          "type": "boolean"
                        },
                        "characteristics": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "minimum": 0
                            },
                            "CPU": {
                              "type": "number"
                            },
                            "GPU": {
                              "type": "number"
                            },
                            "RAM": {
                              "type": "integer",
                              "minimum": 0
                            },
                            "SSD": {
                              "type": "integer",
                              "minimum": 0
                            },
                            "TempStorage": {
                              "type": "integer",
                              "minimum": 0
                            },
                            "onDemand": {
                              "type": "boolean"
                            }
                          },
                          "required": [
                            "id",
                            "CPU",
                            "GPU",
                            "RAM",
                            "SSD",
                            "TempStorage",
                            "onDemand"
                          ]
                        },
                        "maxReplicas": {
                          "type": "integer",
                          "minimum": 1
                        }
                      },
                      "required": [
                        "id",
                        "priceUsd",
                        "title",
                        "deprecated",
                        "characteristics",
                        "maxReplicas"
                      ]
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "metadata-getWorkspacePlans"
        }
      },
      "/metadata/workspace-base-images": {
        "get": {
          "summary": "getWorkspaceBaseImages",
          "tags": [
            "metadata"
          ],
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "supportedUntil": {
                          "type": "string",
                          "format": "date-time"
                        }
                      },
                      "required": [
                        "id",
                        "name",
                        "supportedUntil"
                      ]
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "metadata-getWorkspaceBaseImages"
        }
      },
      "/teams/{teamId}": {
        "get": {
          "summary": "getTeam",
          "tags": [
            "teams"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "defaultDataCenterId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "name": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string",
                        "nullable": true
                      },
                      "avatarId": {
                        "type": "string",
                        "nullable": true
                      },
                      "avatarUrl": {
                        "type": "string",
                        "nullable": true
                      },
                      "isFirst": {
                        "type": "boolean"
                      }
                    },
                    "required": [
                      "id",
                      "defaultDataCenterId",
                      "name"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Team not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "teams-getTeam"
        },
        "delete": {
          "summary": "deleteTeam",
          "tags": [
            "teams"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Team not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "teams-deleteTeam"
        }
      },
      "/teams": {
        "get": {
          "summary": "listTeams",
          "tags": [
            "teams"
          ],
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "defaultDataCenterId": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "name": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string",
                          "nullable": true
                        },
                        "avatarId": {
                          "type": "string",
                          "nullable": true
                        },
                        "avatarUrl": {
                          "type": "string",
                          "nullable": true
                        },
                        "isFirst": {
                          "type": "boolean"
                        },
                        "role": {
                          "type": "integer",
                          "enum": [
                            0,
                            1
                          ],
                          "description": "Role{0:'Admin',1:'Member'}"
                        }
                      },
                      "required": [
                        "id",
                        "defaultDataCenterId",
                        "name",
                        "role"
                      ]
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "teams-listTeams"
        },
        "post": {
          "summary": "createTeam",
          "tags": [
            "teams"
          ],
          "parameters": [],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "dc": {
                      "type": "integer",
                      "minimum": 0
                    }
                  },
                  "required": [
                    "name",
                    "dc"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "defaultDataCenterId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "name": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string",
                        "nullable": true
                      },
                      "avatarId": {
                        "type": "string",
                        "nullable": true
                      },
                      "avatarUrl": {
                        "type": "string",
                        "nullable": true
                      },
                      "isFirst": {
                        "type": "boolean"
                      }
                    },
                    "required": [
                      "id",
                      "defaultDataCenterId",
                      "name"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Invalid datacenter, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "teams-createTeam"
        }
      },
      "/user-clusters/{teamId}": {
        "post": {
          "summary": "createCluster",
          "tags": [
            "user-clusters"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Team not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "409": {
              "description": "Cluster already exists for this team.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          409
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "user-clusters-createCluster"
        },
        "delete": {
          "summary": "deleteCluster",
          "tags": [
            "user-clusters"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Team not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "user-clusters-deleteCluster"
        }
      },
      "/user-clusters/{teamId}/kubeconfig": {
        "get": {
          "summary": "getKubeConfig",
          "tags": [
            "user-clusters"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "description": "any defined value"
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Team not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "user-clusters-getKubeConfig"
        }
      },
      "/workspaces/{workspaceId}": {
        "get": {
          "summary": "getWorkspace",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "teamId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "name": {
                        "type": "string"
                      },
                      "planId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "isPrivateRepo": {
                        "type": "boolean"
                      },
                      "replicas": {
                        "type": "integer",
                        "minimum": 1
                      },
                      "id": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "baseImage": {
                        "type": "string"
                      },
                      "dataCenterId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "userId": {
                        "type": "integer"
                      },
                      "gitUrl": {
                        "type": "string",
                        "nullable": true
                      },
                      "initialBranch": {
                        "type": "string",
                        "nullable": true
                      },
                      "sourceWorkspaceId": {
                        "type": "integer",
                        "minimum": 0,
                        "nullable": true
                      },
                      "welcomeMessage": {
                        "type": "string",
                        "nullable": true
                      },
                      "vpnConfig": {
                        "type": "string",
                        "nullable": true
                      },
                      "restricted": {
                        "type": "boolean"
                      },
                      "collectTraces": {
                        "type": "boolean"
                      },
                      "persistentLogs": {
                        "type": "boolean"
                      }
                    },
                    "required": [
                      "teamId",
                      "name",
                      "planId",
                      "isPrivateRepo",
                      "replicas",
                      "id",
                      "dataCenterId",
                      "userId",
                      "gitUrl",
                      "initialBranch",
                      "sourceWorkspaceId",
                      "welcomeMessage",
                      "vpnConfig",
                      "restricted",
                      "collectTraces",
                      "persistentLogs"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-getWorkspace"
        },
        "patch": {
          "summary": "updateWorkspace",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "planId": {
                      "type": "integer",
                      "minimum": 0
                    },
                    "baseImage": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "replicas": {
                      "type": "integer",
                      "minimum": 1
                    },
                    "vpnConfig": {
                      "type": "string",
                      "nullable": true
                    },
                    "restricted": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-updateWorkspace"
        },
        "delete": {
          "summary": "deleteWorkspace",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-deleteWorkspace"
        }
      },
      "/workspaces/{workspaceId}/status": {
        "get": {
          "summary": "getWorkspaceStatus",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "isRunning": {
                        "type": "boolean"
                      }
                    },
                    "required": [
                      "isRunning"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-getWorkspaceStatus"
        }
      },
      "/workspaces": {
        "post": {
          "summary": "createWorkspace",
          "tags": [
            "workspaces"
          ],
          "parameters": [],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "teamId": {
                      "type": "integer",
                      "minimum": 0
                    },
                    "name": {
                      "type": "string"
                    },
                    "planId": {
                      "type": "integer",
                      "minimum": 0
                    },
                    "isPrivateRepo": {
                      "type": "boolean"
                    },
                    "replicas": {
                      "type": "integer",
                      "minimum": 1
                    },
                    "baseImage": {
                      "type": "string"
                    },
                    "gitUrl": {
                      "type": "string"
                    },
                    "initialBranch": {
                      "type": "string"
                    },
                    "cloneDepth": {
                      "type": "integer",
                      "minimum": 1
                    },
                    "sourceWorkspaceId": {
                      "type": "integer",
                      "minimum": 0
                    },
                    "welcomeMessage": {
                      "type": "string"
                    },
                    "vpnConfig": {
                      "type": "string"
                    },
                    "restricted": {
                      "type": "boolean"
                    },
                    "env": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string",
                            "pattern": "^[A-Za-z_][A-Za-z0-9_.-]*$",
                            "example": "MY_VAR"
                          },
                          "value": {
                            "type": "string"
                          }
                        },
                        "required": [
                          "name",
                          "value"
                        ]
                      }
                    }
                  },
                  "required": [
                    "teamId",
                    "name",
                    "planId",
                    "isPrivateRepo",
                    "replicas"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "teamId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "name": {
                        "type": "string"
                      },
                      "planId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "isPrivateRepo": {
                        "type": "boolean"
                      },
                      "replicas": {
                        "type": "integer",
                        "minimum": 1
                      },
                      "id": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "baseImage": {
                        "type": "string"
                      },
                      "dataCenterId": {
                        "type": "integer",
                        "minimum": 0
                      },
                      "userId": {
                        "type": "integer"
                      },
                      "gitUrl": {
                        "type": "string",
                        "nullable": true
                      },
                      "initialBranch": {
                        "type": "string",
                        "nullable": true
                      },
                      "sourceWorkspaceId": {
                        "type": "integer",
                        "minimum": 0,
                        "nullable": true
                      },
                      "welcomeMessage": {
                        "type": "string",
                        "nullable": true
                      },
                      "vpnConfig": {
                        "type": "string",
                        "nullable": true
                      },
                      "restricted": {
                        "type": "boolean"
                      },
                      "collectTraces": {
                        "type": "boolean"
                      },
                      "persistentLogs": {
                        "type": "boolean"
                      }
                    },
                    "required": [
                      "teamId",
                      "name",
                      "planId",
                      "isPrivateRepo",
                      "replicas",
                      "id",
                      "dataCenterId",
                      "userId",
                      "gitUrl",
                      "initialBranch",
                      "sourceWorkspaceId",
                      "welcomeMessage",
                      "vpnConfig",
                      "restricted",
                      "collectTraces",
                      "persistentLogs"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-createWorkspace"
        }
      },
      "/workspaces/team/{teamId}": {
        "get": {
          "summary": "listWorkspaces",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "teamId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "teamId": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "name": {
                          "type": "string"
                        },
                        "planId": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "isPrivateRepo": {
                          "type": "boolean"
                        },
                        "replicas": {
                          "type": "integer",
                          "minimum": 1
                        },
                        "id": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "baseImage": {
                          "type": "string"
                        },
                        "dataCenterId": {
                          "type": "integer",
                          "minimum": 0
                        },
                        "userId": {
                          "type": "integer"
                        },
                        "gitUrl": {
                          "type": "string",
                          "nullable": true
                        },
                        "initialBranch": {
                          "type": "string",
                          "nullable": true
                        },
                        "sourceWorkspaceId": {
                          "type": "integer",
                          "minimum": 0,
                          "nullable": true
                        },
                        "welcomeMessage": {
                          "type": "string",
                          "nullable": true
                        },
                        "vpnConfig": {
                          "type": "string",
                          "nullable": true
                        },
                        "restricted": {
                          "type": "boolean"
                        },
                        "collectTraces": {
                          "type": "boolean"
                        },
                        "persistentLogs": {
                          "type": "boolean"
                        }
                      },
                      "required": [
                        "teamId",
                        "name",
                        "planId",
                        "isPrivateRepo",
                        "replicas",
                        "id",
                        "dataCenterId",
                        "userId",
                        "gitUrl",
                        "initialBranch",
                        "sourceWorkspaceId",
                        "welcomeMessage",
                        "vpnConfig",
                        "restricted",
                        "collectTraces",
                        "persistentLogs"
                      ]
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-listWorkspaces"
        }
      },
      "/workspaces/{workspaceId}/landscape/deploy/{profile}": {
        "post": {
          "summary": "deployLandscape",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "profile",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[A-Za-z0-9-_]+$",
                "example": "my-profile"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Workspace does not supportMulti Server Deployments, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-deployLandscape-1"
        }
      },
      "/workspaces/{workspaceId}/landscape/deploy": {
        "post": {
          "summary": "deployLandscape",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Workspace does not supportMulti Server Deployments, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-deployLandscape"
        }
      },
      "/workspaces/{workspaceId}/landscape/teardown": {
        "delete": {
          "summary": "teardownLandscape",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-teardownLandscape"
        }
      },
      "/workspaces/{workspaceId}/pipeline/{stage}/start/{profile}": {
        "post": {
          "summary": "startPipelineStage",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "stage",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  "prepare",
                  "test",
                  "run"
                ]
              }
            },
            {
              "name": "profile",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[A-Za-z0-9-_]+$",
                "example": "my-profile"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Workspace is not running, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-startPipelineStage-1"
        }
      },
      "/workspaces/{workspaceId}/pipeline/{stage}/start": {
        "post": {
          "summary": "startPipelineStage",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "stage",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  "prepare",
                  "test",
                  "run"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Workspace is not running, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-startPipelineStage"
        }
      },
      "/workspaces/{workspaceId}/pipeline/{stage}/stop": {
        "post": {
          "summary": "stopPipelineStage",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "stage",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  "prepare",
                  "test",
                  "run"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Workspace is not running, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-stopPipelineStage"
        }
      },
      "/workspaces/{workspaceId}/pipeline/{stage}": {
        "get": {
          "summary": "pipelineStatus",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "stage",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  "prepare",
                  "test",
                  "run"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "state": {
                          "type": "string",
                          "enum": [
                            "waiting",
                            "running",
                            "success",
                            "failure",
                            "aborted"
                          ]
                        },
                        "startedAt": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "finishedAt": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "steps": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "state": {
                                "type": "string",
                                "enum": [
                                  "waiting",
                                  "running",
                                  "success",
                                  "failure",
                                  "aborted"
                                ]
                              },
                              "startedAt": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "finishedAt": {
                                "type": "string",
                                "format": "date-time"
                              }
                            },
                            "required": [
                              "state"
                            ]
                          }
                        },
                        "replica": {
                          "type": "string"
                        },
                        "server": {
                          "type": "string",
                          "pattern": "^(?:[a-z]|[a-z][-a-z0-9]{0,30}[a-z0-9])$",
                          "example": "myServer"
                        }
                      },
                      "required": [
                        "state",
                        "steps",
                        "replica",
                        "server"
                      ]
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Workspace is not running, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-pipelineStatus"
        }
      },
      "/workspaces/{workspaceId}/env-vars": {
        "get": {
          "summary": "listEnvVars",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "pattern": "^[A-Za-z_][A-Za-z0-9_.-]*$",
                          "example": "MY_VAR"
                        },
                        "value": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "name",
                        "value"
                      ]
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-listEnvVars"
        },
        "put": {
          "summary": "setEnvVar",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "pattern": "^[A-Za-z_][A-Za-z0-9_.-]*$",
                        "example": "MY_VAR"
                      },
                      "value": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "name",
                      "value"
                    ]
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-setEnvVar"
        },
        "delete": {
          "summary": "deleteEnvVar",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "pattern": "^[A-Za-z_][A-Za-z0-9_.-]*$",
                    "example": "MY_VAR"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-deleteEnvVar"
        }
      },
      "/workspaces/{workspaceId}/execute": {
        "post": {
          "summary": "executeCommand",
          "description": "Executes the command with \"bash -c command\". Timeouts after 5000ms.",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "command": {
                      "type": "string"
                    },
                    "workingDir": {
                      "type": "string"
                    },
                    "env": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      }
                    }
                  },
                  "required": [
                    "command"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "command": {
                        "type": "string"
                      },
                      "workingDir": {
                        "type": "string"
                      },
                      "output": {
                        "type": "string"
                      },
                      "error": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "command",
                      "workingDir",
                      "output",
                      "error"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Workspace is not running, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-executeCommand"
        }
      },
      "/workspaces/{workspaceId}/git/head": {
        "get": {
          "summary": "gitHead",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "head": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "head"
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Workspace is not running, git error, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-gitHead"
        }
      },
      "/workspaces/{workspaceId}/git/pull/{remote}/{branch}": {
        "post": {
          "summary": "gitPull",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "remote",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "branch",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Workspace is not running, git error, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-gitPull-2"
        }
      },
      "/workspaces/{workspaceId}/git/pull/{remote}": {
        "post": {
          "summary": "gitPull",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "remote",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Workspace is not running, git error, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-gitPull-1"
        }
      },
      "/workspaces/{workspaceId}/git/pull": {
        "post": {
          "summary": "gitPull",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success."
            },
            "400": {
              "description": "Workspace is not running, git error, path or request body variable does not match schema.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          400
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Authorization information is missing or invalid.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          401
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            },
            "404": {
              "description": "Workspace is not found.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "integer",
                        "enum": [
                          404
                        ]
                      },
                      "title": {
                        "type": "string"
                      },
                      "detail": {
                        "type": "string"
                      },
                      "traceId": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "status",
                      "title",
                      "traceId"
                    ]
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-gitPull"
        }
      },
      "/workspaces/{workspaceId}/logs/{stage}/{step}": {
        "get": {
          "summary": "logs",
          "description": "Returns a stream of logs for a given \"stage\" and \"step\". For \"run\" stage logs of Multi Server Deployments use [serverLogs](#/workspaces/workspaces-serverLogs) or [replicaLogs](#/workspaces/workspaces-replicaLogs).",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "stage",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  "prepare",
                  "test",
                  "run"
                ]
              }
            },
            {
              "name": "step",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success: Opens a Server Side Event(SSE) stream.",
              "content": {
                "text/event-stream": {
                  "schema": {
                    "description": "SSE stream with two event types: \"data\" and \"problem\". Both event data contain JSON objects in the form described by their schemas. Possible problem statuses and reasons:400: Workspace is not running, run stage logs requested for Multi Server Deployment, path or request body variable does not match schema. 401: Authorization information is missing or invalid. 404: Workspace is not found.",
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/workspaces.logs.get.response"
                      },
                      {
                        "$ref": "#/components/schemas/_problem"
                      }
                    ],
                    "discriminator": {
                      "propertyName": "event",
                      "mapping": {
                        "data": "#/components/schemas/workspaces.logs.get.response",
                        "problem": "#/components/schemas/_problem"
                      }
                    }
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-logs"
        }
      },
      "/workspaces/{workspaceId}/logs/run/{step}/server/{server}": {
        "get": {
          "summary": "serverLogs",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "step",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "server",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success: Opens a Server Side Event(SSE) stream.",
              "content": {
                "text/event-stream": {
                  "schema": {
                    "description": "SSE stream with two event types: \"data\" and \"problem\". Both event data contain JSON objects in the form described by their schemas. Possible problem statuses and reasons:400: Workspace is not running, path or request body variable does not match schema. 401: Authorization information is missing or invalid. 404: Workspace is not found.",
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/workspaces.serverLogs.get.response"
                      },
                      {
                        "$ref": "#/components/schemas/_problem"
                      }
                    ],
                    "discriminator": {
                      "propertyName": "event",
                      "mapping": {
                        "data": "#/components/schemas/workspaces.serverLogs.get.response",
                        "problem": "#/components/schemas/_problem"
                      }
                    }
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-serverLogs"
        }
      },
      "/workspaces/{workspaceId}/logs/run/{step}/replica/{replica}": {
        "get": {
          "summary": "replicaLogs",
          "tags": [
            "workspaces"
          ],
          "parameters": [
            {
              "name": "workspaceId",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "step",
              "in": "path",
              "required": true,
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "replica",
              "in": "path",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success: Opens a Server Side Event(SSE) stream.",
              "content": {
                "text/event-stream": {
                  "schema": {
                    "description": "SSE stream with two event types: \"data\" and \"problem\". Both event data contain JSON objects in the form described by their schemas. Possible problem statuses and reasons:400: Workspace is not running, path or request body variable does not match schema. 401: Authorization information is missing or invalid. 404: Workspace is not found.",
                    "oneOf": [
                      {
                        "$ref": "#/components/schemas/workspaces.replicaLogs.get.response"
                      },
                      {
                        "$ref": "#/components/schemas/_problem"
                      }
                    ],
                    "discriminator": {
                      "propertyName": "event",
                      "mapping": {
                        "data": "#/components/schemas/workspaces.replicaLogs.get.response",
                        "problem": "#/components/schemas/_problem"
                      }
                    }
                  }
                }
              }
            }
          },
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "operationId": "workspaces-replicaLogs"
        }
      }
    },
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer"
        }
      },
      "schemas": {
        "_problem": {
          "description": "An SSE event of type problem. Data contains a JSON object with given properties.",
          "properties": {
            "data": {
              "type": "object",
              "properties": {
                "status": {
                  "type": "integer",
                  "enum": [
                    100,
                    101,
                    102,
                    200,
                    201,
                    202,
                    203,
                    204,
                    205,
                    206,
                    207,
                    208,
                    226,
                    300,
                    301,
                    302,
                    303,
                    304,
                    305,
                    306,
                    307,
                    308,
                    400,
                    401,
                    402,
                    403,
                    404,
                    405,
                    406,
                    407,
                    408,
                    409,
                    410,
                    411,
                    412,
                    413,
                    414,
                    415,
                    416,
                    417,
                    418,
                    421,
                    422,
                    423,
                    424,
                    426,
                    428,
                    429,
                    431,
                    451,
                    500,
                    501,
                    502,
                    503,
                    504,
                    505,
                    506,
                    507,
                    508,
                    510,
                    511
                  ]
                },
                "title": {
                  "type": "string"
                },
                "detail": {
                  "type": "string"
                },
                "traceId": {
                  "type": "string"
                }
              },
              "required": [
                "status",
                "title",
                "traceId"
              ]
            },
            "event": {
              "type": "string",
              "enum": [
                "problem"
              ]
            }
          },
          "required": [
            "data",
            "event"
          ]
        },
        "workspaces.logs.get.response": {
          "description": "An SSE event of type data. Data contains a JSON object with given properties.",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "timestamp": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "kind": {
                    "type": "string",
                    "enum": [
                      "E",
                      "I"
                    ]
                  },
                  "data": {
                    "type": "string"
                  }
                },
                "required": [
                  "timestamp",
                  "kind",
                  "data"
                ]
              }
            },
            "event": {
              "type": "string",
              "enum": [
                "data"
              ]
            }
          },
          "required": [
            "data",
            "event"
          ]
        },
        "workspaces.serverLogs.get.response": {
          "description": "An SSE event of type data. Data contains a JSON object with given properties.",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "timestamp": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "kind": {
                    "type": "string",
                    "enum": [
                      "E",
                      "I"
                    ]
                  },
                  "data": {
                    "type": "string"
                  }
                },
                "required": [
                  "timestamp",
                  "kind",
                  "data"
                ]
              }
            },
            "event": {
              "type": "string",
              "enum": [
                "data"
              ]
            }
          },
          "required": [
            "data",
            "event"
          ]
        },
        "workspaces.replicaLogs.get.response": {
          "description": "An SSE event of type data. Data contains a JSON object with given properties.",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "timestamp": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "kind": {
                    "type": "string",
                    "enum": [
                      "E",
                      "I"
                    ]
                  },
                  "data": {
                    "type": "string"
                  }
                },
                "required": [
                  "timestamp",
                  "kind",
                  "data"
                ]
              }
            },
            "event": {
              "type": "string",
              "enum": [
                "data"
              ]
            }
          },
          "required": [
            "data",
            "event"
          ]
        }
      }
    },
    "tags": [
      {
        "name": "domains"
      },
      {
        "name": "managed-services"
      },
      {
        "name": "metadata"
      },
      {
        "name": "teams"
      },
      {
        "name": "user-clusters"
      },
      {
        "name": "workspaces"
      }
    ],
    "servers": [
      {
        "url": "https://csa-demo.codesphere-demo.com/api"
      }
    ]
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
