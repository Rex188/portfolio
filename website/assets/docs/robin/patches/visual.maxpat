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
		"rect" : [ 272.0, 649.0, 1000.0, 780.0 ],
		"default_fontsize" : 14.0,
		"default_fontname" : "Ubuntu",
		"gridsize" : [ 15.0, 15.0 ],
		"subpatcher_template" : "Ubuntu",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-world",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "jit_matrix", "bang", "" ],
					"patching_rect" : [ 40.0, 70.0, 295.0, 24.0 ],
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
					"patching_rect" : [ 40.0, 25.0, 30.0, 30.0 ]
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
					"patching_rect" : [ 40.0, 115.0, 32.0, 32.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-comment-seed",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 80.0, 120.0, 146.0, 26.0 ],
					"text" : "◄ 点这里发射粒子种子"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-noise",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 40.0, 160.0, 154.0, 24.0 ],
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
					"patching_rect" : [ 40.0, 195.0, 159.0, 24.0 ],
					"text" : "jit.map @map 0. 1. -2. 2."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-mat-pos",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 150.0, 250.0, 125.0, 24.0 ],
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
									"code" : "Param b_base(0.208);\nParam jerk(0.0);\nParam dt_base(0.006);\n\nx = swiz(in1, 0);\ny = swiz(in1, 1);\nz = swiz(in1, 2);\n\n// Jerk 调制系统阻尼与耗散 (b 从 0.208 降到 0.08，系统发生剧烈相变与喷发)\nb_eff = b_base - jerk * 0.12;\n\n// Thomas 循环对称吸引子动力学方程\ndx = -b_eff * x + sin(y);\ndy = -b_eff * y + sin(z);\ndz = -b_eff * z + sin(x);\n\n// 积分步长随身体动能指数加速\ndt_eff = dt_base * (1.0 + jerk * jerk * 2.5);\n\nnx = x + dx * dt_eff;\nny = y + dy * dt_eff;\nz = z + dz * dt_eff;\n\n// 粒子输出位置 (防飞出软约束)\nout1 = vec(clamp(nx, -15., 15.), clamp(ny, -15., 15.), clamp(z, -15., 15.));\n\n// --- 速度冷暖流光色彩映射 (Color by Velocity) ---\nvel = length(vec(dx, dy, dz));\ns = clamp(vel * 0.5, 0.0, 1.0);\n// 低速幽蓝 -> 中速金黄 -> 高速白炽耀光\ncr = clamp(pow(s, 1.2) * 2.2, 0.0, 1.0);\ncg = clamp(pow(s, 0.6) * 1.4, 0.0, 1.0);\ncb = clamp(1.0 - s * 0.8, 0.0, 1.0);\nout2 = vec(cr, cg, cb, 0.9);",
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
					"patching_rect" : [ 150.0, 310.0, 175.0, 24.0 ],
					"text" : "jit.gen"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-mesh",
					"maxclass" : "newobj",
					"numinlets" : 9,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 150.0, 410.0, 480.0, 24.0 ],
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
					"patching_rect" : [ 450.0, 115.0, 390.0, 24.0 ],
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
					"patching_rect" : [ 450.0, 70.0, 172.0, 24.0 ],
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
					"patching_rect" : [ 640.0, 40.0, 65.0, 24.0 ],
					"varname" : "flonum"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-zoom-msg",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 640.0, 70.0, 108.0, 24.0 ],
					"text" : "position 0. 0. $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-comment-zoom",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 715.0, 40.0, 140.0, 26.0 ],
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
					"patching_rect" : [ 400.0, 220.0, 180.0, 50.0 ],
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
					"patching_rect" : [ 400.0, 280.0, 55.0, 24.0 ],
					"text" : "jerk $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-comment-jerk",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 590.0, 235.0, 278.0, 26.0 ],
					"text" : "◄ 【核心】拖动这个滑块模拟 Jerk 爆发力！"
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
					"patching_rect" : [ 400.0, 160.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-metro",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 400.0, 190.0, 75.0, 24.0 ],
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
					"patching_rect" : [ 470.0, 190.0, 107.0, 24.0 ],
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
					"patching_rect" : [ 570.0, 190.0, 110.0, 24.0 ],
					"text" : "scale 0 100 0. 1."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-comment-lfo",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 430.0, 162.0, 180.0, 26.0 ],
					"text" : "◄ 开启自动呼吸演化 (LFO)"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-gen", 0 ],
					"source" : [ "obj-attr-jerk", 0 ]
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
					"destination" : [ "obj-mat-pos", 0 ],
					"midpoints" : [ 159.5, 345.0, 137.0, 345.0, 137.0, 245.0, 159.5, 245.0 ],
					"order" : 1,
					"source" : [ "obj-gen", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-mesh", 3 ],
					"midpoints" : [ 237.5, 380.0, 332.375, 380.0 ],
					"source" : [ "obj-gen", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-mesh", 0 ],
					"order" : 0,
					"source" : [ "obj-gen", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-attr-jerk", 0 ],
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
					"destination" : [ "obj-mat-pos", 0 ],
					"source" : [ "obj-map", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-gen", 0 ],
					"source" : [ "obj-mat-pos", 0 ]
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
					"destination" : [ "obj-mat-pos", 0 ],
					"midpoints" : [ 160.0, 100.0, 159.5, 245.0 ],
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
