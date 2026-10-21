{
  "patcher": {
    "fileversion": 1,
    "appversion": {
      "major": 9,
      "minor": 1,
      "revision": 4,
      "architecture": "x64",
      "modernui": 1
    },
    "classnamespace": "box",
    "rect": [
      117.0,
      149.0,
      1440.0,
      887.0
    ],
    "openrect": [
      0.0,
      0.0,
      560.0,
      169.0
    ],
    "openrectmode": 0,
    "openinpresentation": 1,
    "devicewidth": 560.0,
    "boxes": [
      {
        "box": {
          "id": "obj-4",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "multichannelsignal"
          ],
          "patching_rect": [
            384.6938738822937,
            870.408154964447,
            40.0,
            22.0
          ],
          "text": "mc.*~"
        }
      },
      {
        "box": {
          "id": "obj-2",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 1,
          "outlettype": [
            "signal"
          ],
          "patching_rect": [
            409.18366956710815,
            809.1836657524109,
            118.0,
            22.0
          ],
          "text": "trapezoid~ 0.05 0.95"
        }
      },
      {
        "box": {
          "attr": "timestretch",
          "id": "obj-30",
          "maxclass": "attrui",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "parameter_enable": 0,
          "patching_rect": [
            527.3333490490913,
            433.33334624767303,
            150.0,
            22.0
          ],
          "presentation": 1,
          "presentation_rect": [
            191.0,
            15.0,
            150.0,
            22.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-28",
          "maxclass": "button",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            261.3333411216736,
            610.6666848659515,
            24.0,
            24.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-9",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "",
            "int",
            "int"
          ],
          "patching_rect": [
            827.0,
            156.0000046491623,
            48.0,
            22.0
          ],
          "text": "change"
        }
      },
      {
        "box": {
          "format": 6,
          "id": "obj-8",
          "maxclass": "flonum",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            851.0204000473022,
            243.8775486946106,
            50.0,
            22.0
          ],
          "presentation": 1,
          "presentation_rect": [
            10.0,
            124.0,
            45.0,
            22.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-5",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            1024.0000305175781,
            269.0,
            57.0,
            20.0
          ],
          "text": "total time"
        }
      },
      {
        "box": {
          "id": "obj-38",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            407.0,
            222.0,
            55.0,
            22.0
          ],
          "text": "startloop"
        }
      },
      {
        "box": {
          "id": "obj-37",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            464.0,
            211.0,
            31.0,
            22.0
          ],
          "text": "stop"
        }
      },
      {
        "box": {
          "id": "obj-69",
          "maxclass": "toggle",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "int"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            756.0,
            180.0,
            24.0,
            24.0
          ],
          "presentation": 1,
          "presentation_rect": [
            10.0,
            70.0,
            26.0,
            26.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-132",
          "lastchannelcount": 0,
          "maxclass": "live.gain~",
          "numinlets": 2,
          "numoutlets": 5,
          "outlettype": [
            "signal",
            "signal",
            "",
            "float",
            "list"
          ],
          "parameter_enable": 1,
          "patching_rect": [
            281.6326503753662,
            651.0204019546509,
            111.0,
            50.0
          ],
          "presentation": 1,
          "presentation_rect": [
            445.0,
            15.0,
            100.0,
            135.0
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_initial": [
                0
              ],
              "parameter_initial_enable": 1,
              "parameter_longname": "live.gain~[7]",
              "parameter_mmax": 6.0,
              "parameter_mmin": -70.0,
              "parameter_modmode": 0,
              "parameter_shortname": "live.gain~",
              "parameter_type": 0,
              "parameter_unitstyle": 4
            }
          },
          "showname": 0,
          "varname": "live.gain~[1]"
        }
      },
      {
        "box": {
          "buffername": "Sample-1",
          "id": "obj-194",
          "maxclass": "waveform~",
          "numinlets": 5,
          "numoutlets": 6,
          "outlettype": [
            "float",
            "float",
            "float",
            "float",
            "list",
            ""
          ],
          "patching_rect": [
            593.0,
            675.0,
            256.0,
            64.0
          ],
          "presentation": 1,
          "presentation_rect": [
            191.0,
            72.43226432800293,
            230.0,
            90.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-85",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            77.0,
            42.41383332014084,
            86.0,
            20.0
          ],
          "presentation": 1,
          "presentation_rect": [
            77.0,
            42.41383332014084,
            86.0,
            20.0
          ],
          "text": "Song swiching"
        }
      },
      {
        "box": {
          "id": "obj-11",
          "maxclass": "ezdac~",
          "numinlets": 2,
          "numoutlets": 0,
          "patching_rect": [
            186.0,
            679.0,
            45.0,
            45.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-3",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            15.347170114517212,
            41.41383332014084,
            48.0,
            22.0
          ],
          "presentation": 1,
          "presentation_rect": [
            10.0,
            35.0,
            95.0,
            22.0
          ],
          "text": "replace"
        }
      },
      {
        "box": {
          "id": "obj-1",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "float",
            "bang"
          ],
          "patching_rect": [
            15.347170114517212,
            72.43226432800293,
            141.0,
            22.0
          ],
          "presentation": 1,
          "presentation_rect": [
            280.0,
            41.41383332014084,
            141.0,
            22.0
          ],
          "text": "buffer~ Sample-1 9000 2"
        }
      },
      {
        "box": {
          "id": "obj-33",
          "maxclass": "button",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            937.0,
            461.0,
            24.0,
            24.0
          ],
          "presentation": 1,
          "presentation_rect": [
            191.0,
            40.41383332014084,
            24.0,
            24.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-31",
          "maxclass": "button",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            669.0,
            180.0,
            24.0,
            24.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-6",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            937.0,
            517.0,
            29.5,
            22.0
          ],
          "text": "1"
        }
      },
      {
        "box": {
          "id": "obj-67",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "bang"
          ],
          "patching_rect": [
            756.0,
            215.0,
            69.0,
            22.0
          ],
          "text": "metro 3000"
        }
      },
      {
        "box": {
          "id": "obj-64",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            756.0,
            290.0,
            59.0,
            22.0
          ],
          "text": "random 3"
        }
      },
      {
        "box": {
          "id": "obj-146",
          "maxclass": "button",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            877.0,
            163.0,
            24.0,
            24.0
          ]
        }
      },
      {
        "box": {
          "format": 6,
          "id": "obj-148",
          "maxclass": "flonum",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            904.0,
            576.0,
            50.0,
            22.0
          ],
          "presentation": 1,
          "presentation_rect": [
            217.0,
            41.41383332014084,
            50.0,
            22.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-152",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "multichannelsignal"
          ],
          "patching_rect": [
            904.0,
            612.0,
            50.0,
            22.0
          ],
          "text": "mc.sig~"
        }
      },
      {
        "box": {
          "id": "obj-170",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 2,
          "outlettype": [
            "multichannelsignal",
            "multichannelsignal"
          ],
          "patching_rect": [
            301.0,
            538.0,
            232.0,
            22.0
          ],
          "text": "mc.groove~ Sample-1 @chans 2 @loop 1"
        }
      },
      {
        "box": {
          "format": 6,
          "id": "obj-180",
          "maxclass": "flonum",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            756.0,
            325.0,
            89.0,
            22.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-216",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "patching_rect": [
            701.0,
            481.0,
            41.0,
            22.0
          ],
          "text": "buddy"
        }
      },
      {
        "box": {
          "id": "obj-220",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "bang",
            "float"
          ],
          "patching_rect": [
            756.0,
            355.0,
            75.0,
            22.0
          ],
          "text": "t b f"
        }
      },
      {
        "box": {
          "id": "obj-226",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "float"
          ],
          "patching_rect": [
            786.0,
            477.0,
            29.5,
            22.0
          ],
          "text": "+ 0."
        }
      },
      {
        "box": {
          "format": 6,
          "id": "obj-227",
          "maxclass": "flonum",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            756.0,
            415.0,
            115.6,
            22.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-230",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "float"
          ],
          "patching_rect": [
            756.0,
            385.0,
            29.5,
            22.0
          ],
          "text": "* 1."
        }
      },
      {
        "box": {
          "format": 6,
          "id": "obj-232",
          "maxclass": "flonum",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            905.0,
            348.0,
            89.0,
            22.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-234",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            "float"
          ],
          "patching_rect": [
            911.0,
            308.0,
            29.5,
            22.0
          ],
          "text": "/ 5."
        }
      },
      {
        "box": {
          "format": 6,
          "id": "obj-236",
          "maxclass": "flonum",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            916.0,
            268.0,
            89.0,
            22.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-237",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 10,
          "outlettype": [
            "float",
            "list",
            "float",
            "float",
            "float",
            "float",
            "float",
            "",
            "int",
            ""
          ],
          "patching_rect": [
            874.0,
            198.0,
            103.0,
            22.0
          ],
          "text": "info~ Sample-1"
        }
      },
      {
        "box": {
          "fontface": 1,
          "fontsize": 11.0,
          "id": "obj-250",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            15.0,
            10.0,
            120.0,
            19.0
          ],
          "presentation": 1,
          "presentation_rect": [
            10.0,
            10.0,
            105.0,
            19.0
          ],
          "text": "Pad Slicer"
        }
      },
      {
        "box": {
          "fontsize": 10.0,
          "id": "obj-251",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            45.0,
            72.0,
            65.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            42.0,
            74.0,
            65.0,
            18.0
          ],
          "text": "Play / Loop"
        }
      },
      {
        "box": {
          "fontsize": 10.0,
          "id": "obj-252",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            60.0,
            122.0,
            45.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            60.0,
            124.0,
            45.0,
            18.0
          ],
          "text": "Slices"
        }
      },
      {
        "box": {
          "id": "obj-240",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "signal",
            "signal"
          ],
          "patching_rect": [
            384.0,
            905.0,
            84.0,
            22.0
          ],
          "text": "mc.unpack~ 2"
        }
      },
      {
        "box": {
          "id": "obj-241",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 2,
          "outlettype": [
            "signal",
            "signal"
          ],
          "patching_rect": [
            281.0,
            595.0,
            52.0,
            22.0
          ],
          "text": "plugin~"
        }
      },
      {
        "box": {
          "id": "obj-242",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 2,
          "outlettype": [
            "signal",
            "signal"
          ],
          "patching_rect": [
            281.0,
            720.0,
            58.0,
            22.0
          ],
          "text": "plugout~"
        }
      },
      {
        "box": {
          "id": "obj-243",
          "maxclass": "dropfile",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "patching_rect": [
            593.0,
            675.0,
            256.0,
            64.0
          ],
          "presentation": 1,
          "presentation_rect": [
            120.0,
            15.0,
            310.0,
            135.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-244",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            15.0,
            105.0,
            95.0,
            22.0
          ],
          "text": "prepend replace"
        }
      },
      {
        "box": {
          "id": "obj-245",
          "maxclass": "newobj",
          "numinlets": 3,
          "numoutlets": 3,
          "outlettype": [
            "bang",
            "bang",
            ""
          ],
          "patching_rect": [
            180.0,
            480.0,
            53.0,
            22.0
          ],
          "text": "sel 1 0"
        }
      },
      {
        "box": {
          "id": "obj-260",
          "maxclass": "live.text",
          "mode": 1,
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "parameter_enable": 1,
          "patching_rect": [
            830.0,
            480.0,
            52.0,
            22.0
          ],
          "presentation": 1,
          "presentation_rect": [
            10.0,
            98.0,
            52.0,
            22.0
          ],
          "saved_attribute_attributes": {
            "valueof": {
              "parameter_enum": [
                "val1",
                "val2"
              ],
              "parameter_longname": "pad_direction",
              "parameter_mmax": 1.0,
              "parameter_shortname": "Dir",
              "parameter_type": 2
            }
          },
          "text": "FWD",
          "texton": "REV",
          "varname": "pad_direction"
        }
      },
      {
        "box": {
          "id": "obj-261",
          "maxclass": "comment",
          "numinlets": 1,
          "numoutlets": 0,
          "patching_rect": [
            890.0,
            482.0,
            75.0,
            18.0
          ],
          "presentation": 1,
          "presentation_rect": [
            65.0,
            100.0,
            75.0,
            18.0
          ],
          "text": "Pad 4 (Rev)",
          "fontsize": 10.0
        }
      },
      {
        "box": {
          "id": "obj-262",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "bang",
            "bang",
            ""
          ],
          "patching_rect": [
            830.0,
            515.0,
            50.0,
            22.0
          ],
          "text": "sel 0 1"
        }
      },
      {
        "box": {
          "id": "obj-263",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            810.0,
            545.0,
            29.5,
            22.0
          ],
          "text": "1."
        }
      },
      {
        "box": {
          "id": "obj-264",
          "maxclass": "message",
          "numinlets": 2,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            855.0,
            545.0,
            31.0,
            22.0
          ],
          "text": "-1."
        }
      },
      {
        "box": {
          "id": "obj-285",
          "maxclass": "button",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            "bang"
          ],
          "parameter_enable": 0,
          "patching_rect": [
            800.0,
            450.0,
            24.0,
            24.0
          ]
        }
      },
      {
        "box": {
          "id": "obj-270",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 1,
          "outlettype": [
            ""
          ],
          "patching_rect": [
            650.0,
            330.0,
            95.0,
            22.0
          ],
          "text": "udpreceive 8090"
        }
      },
      {
        "box": {
          "id": "obj-271",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "patching_rect": [
            650.0,
            360.0,
            78.0,
            22.0
          ],
          "text": "o.route /robin"
        }
      },
      {
        "box": {
          "id": "obj-272",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "",
            "",
            ""
          ],
          "patching_rect": [
            650.0,
            390.0,
            115.0,
            22.0
          ],
          "text": "o.route /pad/voc /note"
        }
      },
      {
        "box": {
          "id": "obj-273",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 2,
          "outlettype": [
            "",
            ""
          ],
          "patching_rect": [
            650.0,
            420.0,
            48.0,
            22.0
          ],
          "text": "route 4"
        }
      },
      {
        "box": {
          "id": "obj-274",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "bang",
            "bang",
            ""
          ],
          "patching_rect": [
            710.0,
            420.0,
            54.0,
            22.0
          ],
          "text": "sel 52 4"
        }
      },
      {
        "box": {
          "id": "obj-280",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "int",
            "int",
            "int"
          ],
          "patching_rect": [
            830.0,
            330.0,
            44.0,
            22.0
          ],
          "text": "notein"
        }
      },
      {
        "box": {
          "id": "obj-281",
          "maxclass": "newobj",
          "numinlets": 2,
          "numoutlets": 2,
          "outlettype": [
            "int",
            "int"
          ],
          "patching_rect": [
            830.0,
            360.0,
            55.0,
            22.0
          ],
          "text": "stripnote"
        }
      },
      {
        "box": {
          "id": "obj-282",
          "maxclass": "newobj",
          "numinlets": 1,
          "numoutlets": 3,
          "outlettype": [
            "bang",
            "bang",
            ""
          ],
          "patching_rect": [
            830.0,
            390.0,
            54.0,
            22.0
          ],
          "text": "sel 52 4"
        }
      }
    ],
    "lines": [
      {
        "patchline": {
          "destination": [
            "obj-146",
            0
          ],
          "source": [
            "obj-1",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            1
          ],
          "order": 1,
          "source": [
            "obj-132",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-11",
            0
          ],
          "order": 1,
          "source": [
            "obj-132",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-242",
            1
          ],
          "order": 0,
          "source": [
            "obj-132",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-242",
            0
          ],
          "order": 0,
          "source": [
            "obj-132",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-237",
            0
          ],
          "source": [
            "obj-146",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-152",
            0
          ],
          "midpoints": [
            913.5,
            607.435480389454,
            913.5,
            607.435480389454
          ],
          "source": [
            "obj-148",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-170",
            0
          ],
          "source": [
            "obj-152",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-2",
            0
          ],
          "source": [
            "obj-170",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-4",
            0
          ],
          "source": [
            "obj-170",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-220",
            0
          ],
          "source": [
            "obj-180",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-4",
            1
          ],
          "source": [
            "obj-2",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-170",
            1
          ],
          "order": 1,
          "source": [
            "obj-216",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-170",
            2
          ],
          "order": 1,
          "source": [
            "obj-216",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-194",
            2
          ],
          "order": 0,
          "source": [
            "obj-216",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-194",
            3
          ],
          "order": 0,
          "source": [
            "obj-216",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-230",
            1
          ],
          "source": [
            "obj-220",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-230",
            0
          ],
          "source": [
            "obj-220",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-216",
            0
          ],
          "source": [
            "obj-226",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-216",
            1
          ],
          "order": 1,
          "source": [
            "obj-227",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-226",
            0
          ],
          "order": 0,
          "source": [
            "obj-227",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-227",
            0
          ],
          "source": [
            "obj-230",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-226",
            1
          ],
          "order": 0,
          "source": [
            "obj-232",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-230",
            0
          ],
          "order": 1,
          "source": [
            "obj-232",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-232",
            0
          ],
          "source": [
            "obj-234",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-234",
            0
          ],
          "source": [
            "obj-236",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-236",
            0
          ],
          "source": [
            "obj-237",
            6
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-132",
            1
          ],
          "source": [
            "obj-240",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-132",
            0
          ],
          "source": [
            "obj-240",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-244",
            0
          ],
          "source": [
            "obj-243",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-1",
            0
          ],
          "source": [
            "obj-244",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-37",
            0
          ],
          "source": [
            "obj-245",
            1
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-38",
            0
          ],
          "source": [
            "obj-245",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-132",
            0
          ],
          "source": [
            "obj-28",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-1",
            0
          ],
          "source": [
            "obj-3",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-170",
            0
          ],
          "source": [
            "obj-30",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-69",
            0
          ],
          "source": [
            "obj-31",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-6",
            0
          ],
          "order": 0,
          "source": [
            "obj-33",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-69",
            0
          ],
          "order": 1,
          "source": [
            "obj-33",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-170",
            0
          ],
          "source": [
            "obj-37",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-170",
            0
          ],
          "source": [
            "obj-38",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-240",
            0
          ],
          "source": [
            "obj-4",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-148",
            0
          ],
          "source": [
            "obj-6",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-180",
            0
          ],
          "source": [
            "obj-64",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-64",
            0
          ],
          "source": [
            "obj-67",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-245",
            0
          ],
          "order": 1,
          "source": [
            "obj-69",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-67",
            0
          ],
          "order": 0,
          "source": [
            "obj-69",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-234",
            1
          ],
          "order": 0,
          "source": [
            "obj-8",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-64",
            1
          ],
          "order": 2,
          "source": [
            "obj-8",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-9",
            0
          ],
          "order": 1,
          "source": [
            "obj-8",
            0
          ]
        }
      },
      {
        "patchline": {
          "destination": [
            "obj-146",
            0
          ],
          "source": [
            "obj-9",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-270",
            0
          ],
          "destination": [
            "obj-271",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-271",
            0
          ],
          "destination": [
            "obj-272",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-272",
            0
          ],
          "destination": [
            "obj-273",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-273",
            0
          ],
          "destination": [
            "obj-285",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-272",
            1
          ],
          "destination": [
            "obj-274",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-274",
            0
          ],
          "destination": [
            "obj-285",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-274",
            1
          ],
          "destination": [
            "obj-285",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-280",
            0
          ],
          "destination": [
            "obj-281",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-280",
            1
          ],
          "destination": [
            "obj-281",
            1
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-281",
            0
          ],
          "destination": [
            "obj-282",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-282",
            0
          ],
          "destination": [
            "obj-285",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-282",
            1
          ],
          "destination": [
            "obj-285",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-285",
            0
          ],
          "destination": [
            "obj-260",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-260",
            0
          ],
          "destination": [
            "obj-262",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-262",
            0
          ],
          "destination": [
            "obj-263",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-262",
            1
          ],
          "destination": [
            "obj-264",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-263",
            0
          ],
          "destination": [
            "obj-148",
            0
          ]
        }
      },
      {
        "patchline": {
          "source": [
            "obj-264",
            0
          ],
          "destination": [
            "obj-148",
            0
          ]
        }
      }
    ],
    "parameters": {
      "obj-132": [
        "live.gain~[7]",
        "live.gain~",
        0
      ],
      "parameterbanks": {
        "0": {
          "index": 0,
          "name": "",
          "parameters": [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ],
          "buttons": [
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-"
          ]
        }
      },
      "inherited_shortname": 1
    },
    "latency": 0,
    "is_mpe": 0,
    "external_mpe_tuning_enabled": 0,
    "minimum_live_version": "",
    "minimum_max_version": "",
    "platform_compatibility": 0,
    "project": {
      "version": 1,
      "creationdate": 3590052493,
      "modificationdate": 3590052493,
      "viewrect": [
        0.0,
        0.0,
        300.0,
        500.0
      ],
      "autoorganize": 1,
      "hideprojectwindow": 1,
      "showdependencies": 1,
      "autolocalize": 0,
      "contents": {
        "patchers": {}
      },
      "layout": {},
      "searchpath": {},
      "detailsvisible": 0,
      "amxdtype": 1633771873,
      "readonly": 0,
      "devpathtype": 0,
      "devpath": ".",
      "sortmode": 0,
      "viewmode": 0,
      "includepackages": 0
    },
    "autosave": 0,
    "saved_attribute_attributes": {
      "default_plcolor": {
        "expression": ""
      }
    },
    "oscreceiveudpport": 0
  }
}