{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 9,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 255.0, 115.0, 1000.0, 780.0 ],
		"default_fontsize" : 14.0,
		"default_fontname" : "Ubuntu",
		"gridsize" : [ 15.0, 15.0 ],
		"subpatcher_template" : "Ubuntu",
		"boxes" : [ 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-81",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 296.0, 634.0, 50.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 296.0, 588.0, 138.0, 24.0 ],
					"text" : "scale 1. 3. 0.001 0.03"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-87",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 595.0, 550.0, 50.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-78",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 584.0, 490.0, 122.0, 24.0 ],
					"text" : "scale 0. 0.5 12. 17."
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-84",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 720.0, 306.0, 50.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-80",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 732.0, 458.0, 50.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-77",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 656.0, 401.0, 146.0, 24.0 ],
					"text" : "scale 0. 0.5 0.15 0.298"
				}

			}
, 			{
				"box" : 				{
					"attr" : "point_size",
					"id" : "obj-27",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 372.0, 306.0, 150.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 372.0, 270.0, 114.0, 24.0 ],
					"text" : "scale 0. 1. 2.5 3.5"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-world",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "jit_matrix", "bang", "" ],
					"patching_rect" : [ 0.0, 45.0, 295.0, 24.0 ],
					"text" : "jit.world attractor_stage @floating 1 @fsaa 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-toggle",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 0.0, 0.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-seed-bang",
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 0.0, 90.0, 32.0, 32.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-comment-seed",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 40.0, 95.0, 146.0, 26.0 ],
					"text" : "◄ 点这里重新洗牌种子"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-noise",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 0.0, 135.0, 154.0, 24.0 ],
					"text" : "jit.noise 3 float32 8000"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-map",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 0.0, 170.0, 159.0, 24.0 ],
					"text" : "jit.map @map 0. 1. -2. 2."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-mat-read",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 110.0, 215.0, 125.0, 24.0 ],
					"text" : "jit.matrix p_pos"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-gen",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "jit_matrix", "jit_matrix", "" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 9,
							"minor" : 0,
							"revision" : 9,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "jit.gen",
						"rect" : [ 255.0, 100.0, 650.0, 520.0 ],
						"gridsize" : [ 15.0, 15.0 ],
						"boxes" : [ 							{
								"box" : 								{
									"id" : "obj-in1",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 40.0, 30.0, 30.0, 22.0 ],
									"text" : "in 1"
								}

							}
, 							{
								"box" : 								{
									"code" : "Param b_base(0.208);\nParam jerk(0.0);\nParam dt_base(0.006);\n\nx = swiz(in1, 0);\ny = swiz(in1, 1);\nz = swiz(in1, 2);\n\n// Jerk 调制系统阻尼与耗散 (拉大相变与喷发)\nb_eff = b_base - jerk * 0.12;\n\n// Thomas 循环对称吸引子\ndx = -b_eff * x + sin(y);\ndy = -b_eff * y + sin(z);\ndz = -b_eff * z + sin(x);\n\n// 积分步长随 Jerk 加速\ndt_eff = dt_base * (1.0 + jerk * jerk * 2.5);\n\nnx = x + dx * dt_eff;\nny = y + dy * dt_eff;\nnz = z + dz * dt_eff;\n\nout1 = vec(clamp(nx, -15., 15.), clamp(ny, -15., 15.), clamp(nz, -15., 15.));\n\n// --- 速度冷暖流光色彩 (Color by Velocity) ---\nvel = length(vec(dx, dy, dz));\ns = clamp(vel * 0.5, 0.0, 1.0);\ncr = clamp(pow(s, 1.7) * 3.2, 0.0, 1.0);\ncg = clamp(pow(s, 0.6) * 1.4, 0.0, 1.0);\ncb = clamp(1.0 - s * 0.8, 0.0, 1.0);\nout2 = vec(cr, cg, cb, 0.9);",
									"fontface" : 0,
									"fontname" : "<Monospaced>",
									"fontsize" : 12.0,
									"id" : "obj-code",
									"maxclass" : "codebox",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 40.0, 70.0, 560.0, 340.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-out1",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 40.0, 440.0, 37.0, 22.0 ],
									"text" : "out 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-out2",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 580.0, 440.0, 37.0, 22.0 ],
									"text" : "out 2"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-out1", 0 ],
									"source" : [ "obj-code", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-out2", 0 ],
									"source" : [ "obj-code", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-code", 0 ],
									"source" : [ "obj-in1", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 110.0, 265.0, 175.0, 24.0 ],
					"text" : "jit.gen"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-mat-write",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 110.0, 315.0, 125.0, 24.0 ],
					"text" : "jit.matrix p_pos"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-mesh",
					"maxclass" : "newobj",
					"numinlets" : 9,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 110.0, 400.0, 480.0, 24.0 ],
					"text" : "jit.gl.mesh attractor_stage @draw_mode points @point_size 3.5"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-cam",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_gl_texture", "" ],
					"patching_rect" : [ 410.0, 90.0, 390.0, 24.0 ],
					"text" : "jit.gl.camera attractor_stage @position 0. 0. 15. @locklook 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-drive",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 410.0, 45.0, 172.0, 24.0 ],
					"text" : "jit.anim.drive @ui_listen 1"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-zoom-slider",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 600.0, 6.0, 65.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-zoom-msg",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 600.0, 45.0, 108.0, 24.0 ],
					"text" : "position 0. 0. $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-comment-zoom",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 675.0, 15.0, 140.0, 26.0 ],
					"text" : "◄ 视距推拉 (默认 15)"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-jerk-slider",
					"maxclass" : "multislider",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 327.0, 201.0, 180.0, 50.0 ],
					"setminmax" : [ 0.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-attr-jerk",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 380.0, 342.0, 55.0, 24.0 ],
					"text" : "jerk $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-comment-jerk",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 550.0, 210.0, 222.0, 26.0 ],
					"text" : "◄ 拖动这个滑块模拟 Jerk 爆发力！"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-lfo-toggle",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 360.0, 135.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-metro",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 360.0, 165.0, 75.0, 24.0 ],
					"text" : "qmetro 33"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-counter",
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 4,
					"outlettype" : [ "int", "", "", "int" ],
					"patching_rect" : [ 430.0, 165.0, 107.0, 24.0 ],
					"text" : "counter 2 0 100"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-lfo-scale",
					"maxclass" : "newobj",
					"numinlets" : 6,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 530.0, 165.0, 110.0, 24.0 ],
					"text" : "scale 0 100 0. 1."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-comment-lfo",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 390.0, 137.0, 180.0, 26.0 ],
					"text" : "◄ 开启自动呼吸演化 (LFO)"
				}

			}
, 			{
				"box" : 				{
					"attr" : "b_base",
					"id" : "obj-73",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 675.0, 328.0, 150.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "jerk",
					"id" : "obj-75",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 670.0, 265.0, 150.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "dt_base",
					"id" : "obj-88",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 775.0, 235.0, 150.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 606.0, 408.0, 48.0, 24.0 ],
					"text" : "cycle~"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-mesh", 0 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-81", 0 ],
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-gen", 0 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-gen", 0 ],
					"source" : [ "obj-75", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-80", 0 ],
					"source" : [ "obj-77", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-87", 0 ],
					"source" : [ "obj-78", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"order" : 0,
					"source" : [ "obj-80", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-75", 0 ],
					"order" : 1,
					"source" : [ "obj-80", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-88", 0 ],
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-zoom-slider", 0 ],
					"source" : [ "obj-87", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-gen", 0 ],
					"source" : [ "obj-88", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-lfo-scale", 0 ],
					"source" : [ "obj-counter", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-cam", 0 ],
					"source" : [ "obj-drive", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-mat-write", 0 ],
					"source" : [ "obj-gen", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-mesh", 3 ],
					"midpoints" : [ 197.5, 355.0, 292.375, 355.0 ],
					"source" : [ "obj-gen", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"order" : 1,
					"source" : [ "obj-jerk-slider", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-attr-jerk", 0 ],
					"order" : 0,
					"source" : [ "obj-jerk-slider", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-jerk-slider", 0 ],
					"source" : [ "obj-lfo-scale", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-metro", 0 ],
					"source" : [ "obj-lfo-toggle", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-mat-read", 0 ],
					"source" : [ "obj-map", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-gen", 0 ],
					"source" : [ "obj-mat-read", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-mesh", 0 ],
					"source" : [ "obj-mat-write", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-counter", 0 ],
					"source" : [ "obj-metro", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-map", 0 ],
					"source" : [ "obj-noise", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-noise", 0 ],
					"source" : [ "obj-seed-bang", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-world", 0 ],
					"source" : [ "obj-toggle", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-mat-read", 0 ],
					"midpoints" : [ 120.0, 75.0, 119.5, 210.0 ],
					"source" : [ "obj-world", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-cam", 0 ],
					"source" : [ "obj-zoom-msg", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-zoom-msg", 0 ],
					"source" : [ "obj-zoom-slider", 0 ]
				}

			}
 ],
		"dependency_cache" : [  ],
		"autosave" : 0
	}

}
