{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 4,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 34.0, 100.0, 1071.0, 885.0 ],
		"gridsize" : [ 15.0, 15.0 ],
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 427.75, 430.0, 315.0, 22.0 ],
					"text" : "/body_spine_7_joint 1.006635 -0.478983 -8.492901"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 769.0, 231.0, 66.0, 22.0 ],
					"text" : "port 50000"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 556.75, 320.0, 186.0, 23.0 ],
					"text" : "print receivedmess @popup 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 427.75, 376.5, 315.0, 35.0 ],
					"text" : "/tHONK/deviceinfo iPhone17\\,1 tHONK ios 18.1.1 1125 2436"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "FullPacket" ],
					"patching_rect" : [ 769.0, 320.0, 135.0, 22.0 ],
					"text" : "o.route /ZIGSIM/tHONK"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 769.0, 273.0, 233.0, 22.0 ],
					"text" : "udpreceive 172.20.10.2 50000 cnmat"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-37",
					"maxclass" : "jit.fpsgui",
					"mode" : 3,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 259.0, 285.0, 80.0, 35.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 336.5, 160.5, 150.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"autofit" : 1,
					"data" : [ 7987, "png", "IBkSG0fBZn....PCIgDQRA..A.D....gHX....P3dJOu....DLmPIQEBHf.B7g.YHB..dndRDEDU3wY6c98iajccm+ysXKOiGu1lzimYVicRbo0HAHYWGQs.1ZxK6vF6i9A1slLAHaFMh7u.08CdF3m5tABvfQ9gVBXARdJr0O7ZXKMiXuXCVr6BilJFAPi8fUTwahi8Faw4GH15WnomMdlIRj2adnHawl08V7Rxh+nUNe.Z.oh2ppawh025btmy8bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgYOpYcGXRyc3aVn2++BrP8brZyYT2QPPXNhEl0cfzfawoyCjGTGAL4UPnBUns11hVKBTa506DDDlW4.o.3s3z4UPACTL.Ug8+oOxaTqffPJwAFAvHq7TmTgYotV2IRcBBBiCy0Bf6xlYuOOXIElSoPkOZqhrmffP5vbo.Xjv28W497fSEfJ63J5o3iXA9G.fCwOJuIZyMUP8wsuJHHbvk4Jyo5J7ApNBeCGZLM+jbMdbtQ1dE8F79QShDCa.7NAQAIotJZ6BBBOhxbi.3s4zqXf0FFgOClFfolA0U0zt1WfuQi1vNAPgznOoiDEqE.WUAUSiioffv7CybAv6v2rfA8lJBx6S6MXZXPUELm6Y3Uh4BaaX8.Xszte1wJwpAv1hXnfviFLSE.uEeyMCfU7osFzaoH3bOEe8ZI2NJATIE5dNQG4p74BfyHtIKHbvkYh.XTd7YpLHq9zXZBpszz5reA9FM74Xahb+cmTnaNP5XU3VAvYUQhhBBBGfXpK.dKNcIfMGzX8YPu0g3Sr5nLs0ZGI.1fn.ZzfjEmxqgr.GAHL.7xU7doiP3YEKBEDNXwTU.zGWd0XpoocYes3aRfAJnirjr3vHHpglAvpJXqIVmSPPH0XpH.tKal8Ab+MUDTxUazXZZvT9eMu5.Cvvs3zkBP0XPiGXZfABAVRCmzWwPcTjiKKtEKHLeyDW.ri32NIMdeZL09DbnkSxc2eAuVX.Ak5lifFz0eZd0iNQ5zNv.g5nHLuTPjayNQrFTPX9mIp.nOheFLq9z7JmY.GCqVO1hVGdV3prAxpibk+TdHDtUFn7TpqIHHLDLwD.Gj3mFSy.TKmjar2hWe8jlUHZ3LOCe8U6cacbYMuNxc0iPj.U19cesmY+A.0Cf2gnY+gy9S+zQHbyfnTuwI5ni+hR.RDDluXhI.dad8q6R7yfttAUYaIxLzM4nMUbUS+d3wwz3o3UNJQAsnHPgfHAvwBcjH3UCfp9LegMQBtURZLB0Pi.XYY9GKHL+vDQ.7175UbEvCC55GhOwhtFuOeSN5CwOiGm2lGi2dL6sISGgqyBr0frfaPyBkNiK3hhHnfv7Aot.3s30WOf.qh.II98K30ByPvUFTxQ+37173788tPGjlniR54MRJ5tcRglq3ZrAEQPAg4GRUAveIu9RYH3J19rjD+5TR62Ioji9P7y3Sy2g.1ME6wiFcDBW0kEgFHq9E45A+uHjek08WDAEDlCH0D.iRSkLW2lHlASiCwgNpCwuRAnRbt6ZvTMG+IMVfOvq4MbW5LVdMAtgil7YIZb6BGlwNri.1QcYInYWJQ.U3GA70fDDAcdLDDDl7jZED0.xTwl3Wz74Eq432fD+5M4n6Dw0RIk1I5np0xUApMrVWYhNtEzvySTd9ElPycN2eM6RdB5TLF9x.+EXUDLny0Cv5CS+TPPH8HUr.Low8qM5ksM6N7P7KVxQaqRuzIESNKQQrM0Ryj1+cTI3mQI9V.+W224qQGK2hctL6RnVw0CT8IRawRPMrQFQ7SPXlxXK.9K30BWfEtosOSidimgWc8929fD+Ln25o4Usl7vcK3ocltYaLL4s2vP6lby.UGq.eWfWitBgkcM6NZ2jJAJG4DXGQP8uRlgHBByKL1Bf2hSuS7klxnfdXappMn.dnwT9Y3U1x04yDMlcYmTBe.X1kBDXojZ8t.OKKpxY+ba1krZE6DnbjOf+E.+m4nRvODDlOXrFCvnY6wCB6e6ZLM0nW1V6uOOXjE+.vWwiNioWd8CKO9OeeMoAQkKq58Wgm0JNYfsC5uI.rS6lTMvPYUt86FrJGMM6xhZbHB90.cSNIY87ZHxk50xjUlJcBBSBFaK.6tPF06X.5Z985xZQvOwuAQmYjwIIZFg3ckaICrXuaqcS1M1330+9YnQfgkU4hKlMPKA0rrJm6xpem8es.UmDBWSYUNwkYAgzFqF5LLjiUa9L7pq2hVG1foZjqu1D+d80cI9YvrpMwucYyr2hu4lCpOXfRsgaBb8.XkgrnlFS.KvPYsIYWrCTDpUriY23i4mJGMCLrn1X2ROshJlcsKvZ1kUzJt4dheQsO0WiSDDDlR0CvawoyGf5519LWA7n2hofq1XfRZXswb9+5LnFlcoPGKwJj3QvgEZlcIeGKAimdPFplIKwFlf1MYGqmOwJPAgTmw1BPOwpUbcBTRhhe.nHnzs4zq7v8ivNk89JoPwOngqOPkiZYxxhnYQsIgDVNfJNrDrdfw932EnXIytrTrsaXUasWrBTPH8YhaAnqTdIJPIsOZ+0yujJiVsQu7yvq1sDT485Gr185BR9LPNeNFcFWtMcllKQmHqVo0tIa1qKs60bCMxjkCao81SmFwJPAgTkIt.3s4z2zVYsxUfRRpRx7o463U0eoifW20v2ZCWONYL6xJDX2h1Nm7i1efQ5Hdd88xqvdatlMxja+IDsYWBIfX4Vo1zwhTAAgTgIp.XBV+U6Y3Uh8f7s4zqnPYUbwGwuNEofyMIyQPnm45qs9fglAFNb+oHiqbKzU6SXr.OrJmL+gEDRClniAnxQswK.0F8usn0J3QS7qSQOXwLQAzn1n0a8GUN1Bsyw1KqVQrJhiJG0zl3o9RfZuxq+92tgyZ63qUbpQoOKjpjmn7KsvrsaHLtLwr.zk0ethnqqJH8iyay+J9NIcpVUANWSQljjjkf1FutDbs00XAdy9ca1Ua8fBiv9zkdW9.FFBYvAop1PzVXvqyy1HO9Mlw0w97IOD3TD8cnsTrpIQWGai+SwwBd1NaLIueLpzfGdeYbOO8drlnL1Bfe0ie9kTJyIwn19ia2t5M1tbSvsflsExHWt91oRxr3SyqTf9hj77RM0yU.KRv0VuCvgqfmXabF8.yP1dazfnGzOK98895jPExtCc+MXVhxkyAIT0D3v3eguHrywcPTEhkVRgD86tXQqOAZBrJCVHbd89wnxF7vh6QZcdZvCewx.WtbGEFaWfCTlhJBVRoTUd7LYt4y8BmqxexQ9yVwl3mASUaQ8033KKErwyvqTuiEdk6rPFM2H9APlrT1VBOmfqswb+G.shhVZ64bz1SNJ80TfPhpHOWmnzPJLEO1MwuUOurLbObkXslLgycIhtNGFwOHp+Uwyy63RHSt6GyCDRz02UH5kXkR6SvXK.ZLp89AhRoxBAk9B+Zs0wxSgJ13ZEMM5rVGAq0aThUQA3XwNkip4Bwut3JW+Pwo5eFenxQCayxjN4EXXessti7Orvn1WSQJPzCdkRwiYU76M8qfeeGrjmsaC1uEkkHR.y6TsxBcOFSKJP5e+XdhPh99bGFu6K6iwR.7q7hWLejn29449G93XsMZEby1Rfox5f5qocLQEETOCb34IwOXOgps5e6IXEnUK6vt0F1BbRdWSktoLcs1oPJdLKiet2NnoHYVOZCD4hUuigbAROgqR3wB7UJxj39w7FEHEEAGKAvfVsi8.6+1ls3o+v1wZqAkqhhpkRnudqYwBd93PfgU0FKO3ZwcUUN1xVa0pXUrFBLbUGmxBiP2bRwUH8b+pIwGKNajmjKnrqfe8odeQaWAjzj0HEsXwSRy6GyijGhmoEiBik.nRoh8.6+96deGs1XypGqikUazVGmr4Y5DrCaVqEZaJu4nswZmqpFid3J3CSZF1wkaPTC+hr+ZX+A8P7q+rA6OZi9JZNLjkouaoo88i4QJPJ7853MFfp3U2ku7chK.Zvzn+EA8nEQIaER03AJ4fBCY.NrZYmY23V1YspxXwZwYLkHcEO5WbxE1rXyGq3pSbKH8M3RUIp+cF7qONKBZUIdz1JPHED4GYAvuxKdQqVfXS.DL0hehyTv19qsao37OWnXA0+8kVaie5uisO0KK.APa20Vai4Yn28M+XChRIk9+KWmOyGF1HllD9FU3BreKA7MvG8WzIxyf+NsIvQIxE806bLNLCNkW7MOD6kY08iEGw+1ZHOO1t1592gwOO.BYL8DZjqHzp15PT6OMBe5OrMepGni0VCpXV6nHtUQZLMss.JM2x2tXHsUmBTKQmDVdq2+2j09s+w6qYAJxZ1k78l6dpbzrcSZDa9Aq3H8eZBLbi9yXSayq3IDMI5g8lL3fJTjzMozq043Mn.IrIO7EJ9D3iyP7YLjOOHUF6uLpLQhtgIru4sbNGElz2OpM7coTmFD8xkeEC1JukXLBJ5HaAnxXh8Cla+DYnEsNbazKqQuQ2BjpiNXr8eZLM1RUZwRnTqPOhQM9vmf5evm0VqKXYa0rrsPKay5MXatKOA4LL3nyFNANu93Jb2H95yX30.6VPMn8CRNEcFzKtS6wrcVc+XZhOWieww4DL5V.FD+DaLl5cF+tFjvOH1kMy1hVgV9HWQ7b9DkcA6Z26yS9Oy9WHf01bAxv6XwxNaOnzXD6goM0IY2KCm.myttBGeQpZ+Txyi2pL5KepYSXeOKQyXAWzXDOmIwr39wzjlLguFG8ffXTwNwJO+gUKZY8sgJTyU422.4k1tNVRmk+p694Zp0rAZVFMGU8YQ0eIuBf.2V1EK4oczCBG9N8XwrJ2CqQ53ZcRIZ83l6gMHpe55uFdb7GVlGxEzCzjpUCFim9hqwDZa61ST54cLwtlu7u7eS8L4XcUNpNf4rqqG57xcI8zU.LjA2uZLAO+9FUXWLnfp3yucKw7yrsHjY68ioAYYvAzZrLZZjcA1Ds1712FM+Jas0xdGNkVNRl7XLWMd5.oB8bua36oQarDvjoK9DbgIoE795JrKFjqu0773jmGNWeqQjau0X5O6jlT2OJLB6SClLhs9LKZ7TywNi9X.pTo5f51IXIOZfmBUpbzv2WYPzOv753Nh7Ew9O9yxCKETChI8X3VC+hJrs8aKOZ2VLbV2UfG98RCfygeCbuOLqteLJufo2JASZPdhhtqO44Wsw4DMVKL5oIFTowOZDFcJw36Z2VicuXvrAQObD5Y68MeB68XOJisVHQOvdJhBHx5ivwnWJwAi6GiJoQ4.qIy6BfO2wO+N86h324G+Oxeze6+3j9TOewEJVfffXucs1899T3Iu6rnGk1jVV9LHZRjPkuyY2yh+tm0fHwxwYdl1cZnUjnDDdV8h8o08iYIVqZ5CCSqkEyAhBiDQqCtz.+mcBoACyxBPsg7XWE+sXLIxieE30IAMX5d+XVPCRgLCXLRCl3SuMqMyyAh0VAT8.KIsFB2GYOzC7sogiRWYJPShlZXSKqMVmgKohGk552VDMk2F2wkNKoTUKYHXZe+XVPpcMlpV.ZK4nsEY3a8DYRyS6rEKUDGvzHd6rKf0eBS6hYbDfcQchbyaZE.qPF9I.+nrOPz0zQIxZvFiv92kBL8Ralo88iYAMHEuFSWWfsjbzFKpz2tOAPClFFLU+E7Zw1+4erDMbaV.ZFJALut4FL6xyqtiC2z9gsQsV8sBid8SbKhlb9Gsy+dTr5XRuR9MqteLMo60XZXY9dLN4AXcUe+nxXwUCUPPrN6OO6g3u9IWXieu60p1AyjetCWrXdT1buxbiXaRohUjCbE7CKqovgN5AMFXeL8ndmyW2EnlosKViiHFDIddTF89cchrFrLQQJtH9Gw37DYIZiQ7b6p+zfz+9w7VB5VmnfcLQ9M23LFfw7cyZtA1pUi92zu9PJ9F+G+bMOPK9AfwwCjVmivw+t41+SOVMslMzFp0cs+vZs+a5L9etJ+Rc+qaYfZKl9hegL909sz3XzktAJ4v3evFBGxyw778izf9KGYtHKSvW3N5BfAA0rs49qSfu01kaXLlXc9ff3k8od4XuvEJ7buv4pbrie9cO1wOeoQteNIQED20FCM3k1d+hXe6hg1FCv+1O3SsclbrdlrrXlrbXzjywBrj84NctCXUOmQmwcAJpKiqUj8SShBJiOkv+z779n.mA+hPeHSvEWpQW.zhkc.DzVG+gUU7HF26pIWubrie9Metie9apfcffRJkJqZdr7deghErGXCS7Iaeam+3eeBkpbzz1bGVaoFA5X0h6QQVB+DOVD+dfxkXZIhlEDt9Kon4VkGcG6sIIkwOK6VhIzhK0HK.5xxNkxDKpnFc7ojiRoxZqpRqTlrnTg8swv4Nq.UJGhx1pn0pXE+ULzjSrcMOOa1r.rgm66AYxheu8uq0D97.UH1egZHObpsY6uAMdeGDcCcVSC7OmK2jIv5fy3snHY6sdl3qyGJsNtUQ.Yzsi4Bog.KBHfBV6HEqLejrzWrXIaqGJXL0h49akhYQYyZW+xiRvQMBz8pE2iR3iquciNH3eB.ayU3ZdretJ.A4sb75GeN9+KQpheqEzP5MTH6wXI.ZLl3ODpTgGqXkvd2TGqEiIVZLpk5WT6sdiSTyZRVqTgOdlLydWgqTLKD33AAKV+sfqb.yjTwy7gsx9JJmyZI3iPrD9slVzuUe9N1R8+vjOeeVhHWg69Bor7PWmGDGTtes9X7W3HdN8MWKyieUAGuYrlKv5ExTMi1DSTxDDrD8MMULFy45OJwJkJ6imIyRz2j11nTazeJ1zo8q7UO94u5O3MeYeeiQ5ygTWwZpuDY82Vw1t8.kzjG32a8zJddGukplO6+ATxh+Kp419dbUhpaeIQHQtB2MZjMIRjZPtY4qvbuLKRanQkwwHiZLZCMSS7uTmUhGl5OiMikEf+vK8R0sONfp3KF3NbC1V.Ndq23D0L3r8UbshzMwoRwrXbXBtwD20qKVrj0.kXLUo7199.QrG1zFp2etB9HFtVue6ktOzXi5LZtBO1StdGLoNtOJQM7et8VgTJ0vF6YBhREOpmJkJuM2fA8VVN.VCvwG2RW1g3Z1f15clIhfk2tIsLKh1r091twbF6AzHv9aSUl3OPbgkpvEW9lbwk1jucwP.L6RdGSANKmqGYn.9EwuAUkWVG+b6rWWg2xy8YXnJOZe+JMYU766+rjRyw5wV.TaT1GKqLY7N.G.a1+XAdisK2z33M7cEAO1KbgBCY2c7o71M4DUKiwD81JsoNuT03I04EJthCq+bGnDEgnTqfN3lbgkt9Z+zeGqtAFXv02iGzw2n9VG+p2d9DgwP1uWH9lZF9P2YOhf+362W4IEJBqis.3O3Me4pXrL4+gR9FfiNiEXLqk9Au4KW0n0VckoS9AtywV9bqOZ87wjWp5pfdYVvDOIXqTLKJGV+YyU4EnTrwULPkO2ic+B82TsgFCXcF4fLqfet136rHXTbEtNoSc7KsNN+KMpi+2eWiwLAySkhgfwDO5mJkJ6iEDTp+s2NSf0KNkRshMK5dqqbx0s55b28KHXsic7ye8Yh0f+waWk+nsaDa6GRUwYfRr4prs.k.T5YeWaad1E.nIK4wuAf22n71k0Y3cEtq30n9hlpHheiCCy83qvXjZLoSEgVq2hf3V7DnTmh9FXye3kdo5G63m+LJkJ937XLW4HEqb3arc488Cmq8Fmr7y8BmCHtfJr2bPdmi8BmqJDb125MNQsQ+hYL4BEWwdd+AjwD27dGAJozuw6ZsVAFXF4ATu1.97Fi3wcPGyAcd6xI8ns8lyeCCkwunJ2aFITmn4aaI7KnLPT+eC76ZdPsogGGigkFdbdGG59baZbdJi+SAtUXDcGN0p7CO2KbtJ1DnLZ8FQVw8PNRwJYe7LYtoRohobaLl5u0a9xG0143XG+7aZU3L9AogAphRscpKFd46VhLYpxx4h+1cGk8d.Pq2fSr856aaUJlkCEbcaBf27+z+SB+je39ODFpkIKKN5cdgwftI67Wj8mpL0AtASt09WgIHol.3wJVITsvB2r+saLlleb61wrp6qd7yuTfR4HRN5st1abRqCFZmHFuoMwSqXL0t1a9xiunwU1MKszUHPsDZSUdwmb+i82EKlGB1wpquZScNQ03h5Wn351rbtvSdW142+6GuOnorJ2b8BcifvAJRsBhpqzbQoTY+jKDelSDkLytFaufRQVTZ477lu7Vzt8Q8sj7ixZ.ZFNtzcJP61WmfNt1FnVhKeuGdMkj3mglnr3562tXnqw9ay+c+0w1Vmfer0ndIHHHDmTshPaZYOhsPPIaAo3iZoW01Tjq693TDb6xMt1a9xKZLlxNh.8C6SZdmj60IvktSAt781gfL6fJHbeelRsBW9tkRT7C.zqFKsW.ns8.kT523csVl7CLOxuH2HHL0I8p9qWY2PZo27Y+a96W5Y+Q+z3etwz3iZ29n86JbRiGXm8q1G0t8x8ue8xwN94Kof0hUEY.LvhC83.d46rDDbJqE7f8wGBe7qzD9HW88y3LGACrLehMz7686+Wd1BO48NUPOhiZCMxjkCOTWCBBBCjwW.LZrwVgfnxC0B2+A7k+e784w90eTrlZPW8sdiSFKu49Ju3EyGzVuSBhfMZmIX4e3kdoDSKgO8e5e+0ex26Wl+yb66wSr6G..eTqV4RR7ry0PHsakGSPQTlkPEL3wWzbW3A+W.86Y+y0ls3DUsE02DFqvn.kX1krZEqEn5LiHjw9SPXhv3I.dkcyR61Wue2C+bu+s329u7sstKZsd0evUNYr472.EAwdDk2iu6t4IiYuI.+B2+A7DM+.9fmJWcPEMQ2MzqukGIRDxj2KAudo8+an0+Mv7g1+bWheID0WaAJwrKgZEqkIqLaBDDlDL9V.d46siMWE+RW6F7T+72OVySJMW7QDDiow0dyWNt6fW9dahOoHy3f4tvC9yA8OwcabI9AvEWx52UQGa8QsNVgBBBSLF+ffjIv5C6uy+geW9vbel8sMC5peb61NSIke3kdo5u+W92Z492u8gkxqemi9vVhh7GitAFcY9++0yQ6eha2o05MbJ9cgkp3T7S6HPIBBBSTRmffbo6sd2w.rW9T69A7698tFYt+CHob6aOhbodmEdP67eoqcCx892ZeerqbJjKcmBDjwmZI1vgwTCLmi+fO+V6sMa4tmglnzk4Oda6SSsKrTEBTkr9YIYwnffvDkzKJvNbE9o94uOe9e96swO9O8qs9.OFW5dWYubsC3K7StIO6O5+WGAT2ieXz4+NKAAOOXVJVJqLLXL0PY1lfLUY4bMr1lKt7M2ab7LlZjwT15bBFFj3WcZYVbHpMfBBBoHoaZvDEPDKICrtAYxbTqSert3XL7dre8GwW5Z2fOyu7t1G6OW8kVsBgfBn3yRRU4WCWk.SSzl57hOUMuN9eqhKgInBF8FbhscWDGSR7yPSdf9vh3mfvrizS.DhrBSkw9zaynqSlLKZUDLx02alTzXW39OfVKrvFrPvYRTHcZQkhYcJdUoXVVPsCAVVn3gHwOzKJi6mfvrkzU.DbNdf.CRDLj1suBpfjqzyFcSPsEYBNqSWTmkLnYFhH9IHL2P5K.BvktWBt9kfHHLboyh1TEkY68EjhzjtIH8evS4WM3yQwMXODwOAg4JlLBf.b46dcmVyYz0QmoL+g4rKDbo6T.kpxPELCsoJAlqR6L0bdbGDWY2rztUgNASo.pf7XzMISlCmna2WrXdLpJNc4EDwOAg4PlbBfcRokDDAahwrbhAd3R2acTlSMzyTCHJ5rFZ.cKFB58edTpPLpvn+MOOXBcJ3ZzksZkYzX8soSqc6hDsWAg4RlbBfvfEAA.8p7Bed2QR8J6lk150l3yxijn+5+WkhYYAVAUvobWEX1ae2hVlUEwOAg4OlrBffehfFSMxDrbhtY1snKLpVDNtDnNLebInkZsNqfaI2Ghb4cUqKV5BBByEL4E.gthWI6pnQ2DLk8JfCW9tkvnJ1aRSOQwbW3e5BMf+ug909AjbzBBByELcD.6hOQ3MxZvxdkhKQVWtDF0y6cYrxWLuGn+6f1+UtK4Uw1GwpOAgCRLcE.gHq2fMGnXk1rEKDrwPkqeOrt9kGeK2UFcCP0.CMP+8Jf9+SHl2ycotxY+UuAs3LxX8IHbvgou.HDU69BZWwqjd1npNzBgiJCJO95GCMwXpxBlMD2cEDN3wrQ.rKCWROuEnOm2yW2QgKVrDpfAuVjZnAF84DK9DDNXyrU.D5lzyaNPqA6RjKqUQGbtQNgmcQRqqucs1KvrsyxdkffvAJl8Bfc4Mt6JXXsgJPFFcCLpZnLWkLYpkJtI+sV1r2+VapihniuH5IH7HGyOBfv3mqeQEJg5r25+QOy9iEVntWUQlKTbcfZzh5h6sBBOZy7k.XWljI8rt8hSzwQTPP3.Co5Bidpwx4ZxK9jqSlLGFitLFsT.ADDDRclOs.zFe2cySf9jicIuWr.TPPnCGbD.6ku6t4IS6BXTEctRq4BQ.TPPnCGLE.6mnDqNOnNBP9DKsUh.nffPGdzP.LItzcJru+uuQCVPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPXJv+L.hA9eaIiCXSB....PRE4DQtJDXBB" ],
					"embed" : 1,
					"forceaspect" : 1,
					"id" : "obj-13",
					"maxclass" : "fpic",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "jit_matrix" ],
					"patching_rect" : [ 9.0, 525.0, 145.454545454545467, 60.0 ],
					"pic" : "C:/Users/David/Dropbox/Pixsper/Branding/Logo_Google.png"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 159.0, 235.0, 54.0, 22.0 ],
					"text" : "dict.print"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-6",
					"linecount" : 3,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 389.0, 35.0, 262.0, 54.0 ],
					"text" : "The list of available sources can be retrieved as a dictionary or as messages to populate a umenu."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "jit.pwindow",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 89.0, 285.0, 160.0, 120.0 ],
					"sync" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "meter~",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 109.0, 425.0, 160.0, 20.0 ]
				}

			}
, 			{
				"box" : 				{
					"hidden" : 1,
					"id" : "obj-20",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 279.0, 25.0, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 279.0, 55.0, 106.0, 22.0 ],
					"text" : "getsourcelistmenu"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 189.0, 55.0, 76.0, 22.0 ],
					"text" : "getsourcelist"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 19.0, 425.0, 74.0, 22.0 ],
					"text" : "mc.unpack~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 159.0, 205.0, 174.0, 22.0 ],
					"text" : "route sourcelist sourcelistmenu"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"items" : "<empty>",
					"maxclass" : "umenu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 239.0, 235.0, 200.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "multichannelsignal", "jit_matrix", "" ],
					"patching_rect" : [ 19.0, 115.0, 96.0, 22.0 ],
					"text" : "jit.ndi.receive~ 2"
				}

			}
, 			{
				"box" : 				{
					"border" : 0,
					"filename" : "helpargs.js",
					"id" : "obj-4",
					"ignoreclick" : 1,
					"jsarguments" : [ "jit.ndi.receive~" ],
					"maxclass" : "jsui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 119.0, 115.0, 204.26300048828125, 69.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 75.0, 35.0, 104.0, 20.0 ],
					"style" : "helpfile_label",
					"text" : "Toggle on qmetro"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 469.0, 235.0, 126.0, 20.0 ],
					"style" : "helpfile_label",
					"text" : "Select an NDI source"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "ezdac~",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 19.0, 465.0, 45.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 19.0, 35.0, 24.0, 24.0 ],
					"svg" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 19.0, 75.0, 81.0, 22.0 ],
					"text" : "qmetro 30 hz"
				}

			}
, 			{
				"box" : 				{
					"background" : 1,
					"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
					"fontface" : 1,
					"hint" : "",
					"id" : "obj-24",
					"ignoreclick" : 1,
					"legacytextcolor" : 1,
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 69.0, 471.0, 20.0, 20.0 ],
					"rounded" : 60.0,
					"text" : "3",
					"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"background" : 1,
					"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
					"fontface" : 1,
					"hint" : "",
					"id" : "obj-21",
					"ignoreclick" : 1,
					"legacytextcolor" : 1,
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 449.0, 235.0, 20.0, 20.0 ],
					"rounded" : 60.0,
					"text" : "1",
					"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"background" : 1,
					"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
					"fontface" : 1,
					"hint" : "",
					"id" : "obj-50",
					"ignoreclick" : 1,
					"legacytextcolor" : 1,
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 55.0, 35.0, 20.0, 20.0 ],
					"rounded" : 60.0,
					"text" : "2",
					"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"order" : 1,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"midpoints" : [ 67.0, 268.0, 98.5, 268.0 ],
					"order" : 1,
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"midpoints" : [ 28.5, 413.0, 118.5, 413.0 ],
					"order" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"midpoints" : [ 67.0, 269.0, 268.5, 269.0 ],
					"order" : 0,
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"midpoints" : [ 105.5, 194.0, 168.5, 194.0 ],
					"source" : [ "obj-1", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 1 ],
					"midpoints" : [ 83.5, 455.0, 54.5, 455.0 ],
					"source" : [ "obj-11", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 198.5, 106.0, 28.5, 106.0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 1 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 288.5, 106.0, 28.5, 106.0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"order" : 2,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 1 ],
					"order" : 1,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"order" : 0,
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"hidden" : 1,
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 339.0, 265.0, 444.0, 265.0, 444.0, 106.0, 28.5, 106.0 ],
					"source" : [ "obj-5", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-8", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"originid" : "pat-12",
		"dependency_cache" : [ 			{
				"name" : "helpargs.js",
				"bootpath" : "C74:/help/resources",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "jit.ndi.receive~.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "o.route.mxo",
				"type" : "iLaX"
			}
 ],
		"autosave" : 0,
		"oscreceiveudpport" : 0
	}

}
