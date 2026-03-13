const albums = [
  {
    slug: "kauge-tn-28-viljandi",
    asukoht: "Viljandi, Kauge tn 28",
    ehitusaeg: "2023-12-01",
    pildid: ["IMG_20240124_WA_0036_8c7ea28788.jpg","IMG_20240124_WA_0037_6e922a37e3.jpg","IMG_20240124_WA_0038_5c7765e36b.jpg","IMG_20240124_WA_0039_6085fcd24c.jpg","IMG_20240124_WA_0040_3776e7e915.jpg","IMG_20240124_WA_0041_fee1963d3b.jpg","IMG_20240124_WA_0042_3f325aadfc.jpg","IMG_20240124_WA_0043_a7e0f0dba2.jpg","IMG_20240124_WA_0044_f76ca7f3e3.jpg","IMG_20240124_WA_0045_d929b9212f.jpg","IMG_20240124_WA_0046_4df3e976dd.jpg","IMG_20240124_WA_0047_8d1f5768aa.jpg","IMG_20240124_WA_0048_e07fdf074a.jpg","IMG_20240124_WA_0049_cdcddbb313.jpg","IMG_20240124_WA_0050_a62638417f.jpg"],
  },
  {
    slug: "liiva-tn-viljandi",
    asukoht: "Viljandi, Liiva tn",
    ehitusaeg: "2023-07-01",
    pildid: ["IMG_20240124_WA_0004_6101709d33.jpg","IMG_20240124_WA_0006_7e2545ddd7.jpg","IMG_20240124_WA_0007_f3ea7642b5.jpg","IMG_20240124_WA_0010_8eed9edf0d.jpg","IMG_20240124_WA_0011_392d5fa73a.jpg","IMG_20240124_WA_0012_64ee75abe2.jpg","IMG_20240124_WA_0014_8235390d94.jpg","IMG_20240124_WA_0015_5b7d705d61.jpg","IMG_20240124_WA_0017_ca586a28a4.jpg","IMG_20240124_WA_0018_c92c4f29de.jpg","IMG_20240124_WA_0020_2a86c02854.jpg","IMG_20240124_WA_0022_9d215f0533.jpg","IMG_20240124_WA_0025_760f36b238.jpg","IMG_20240124_WA_0029_8c767d6238.jpg","IMG_20240124_WA_0031_7eb7521a51.jpg","IMG_20240124_WA_0032_7f531db847.jpg","IMG_20240124_WA_0033_a3fa3979a3.jpg","IMG_20240124_WA_0034_f4a569c1e8.jpg"],
  },
  {
    slug: "laane-6-viljandi",
    asukoht: "Viljandi, Lääne 6",
    ehitusaeg: "2023-05-01",
    pildid: ["laane6_1_d28ac2f730.jpg","laane6_2_77ef16acd4.jpg","laane6_3_dac5b3098d.jpg","laane6_4_960c643e34.jpg","laane6_5_d2dd402dc0.jpg","laane6_6_7f2e8176bf.jpg","laane6_7_006cc885ad.jpg","laane6_8_d266dc783b.jpg","laane6_9_6924007dd7.jpg","laane6_10_19ce5cf6b4.jpg","laane6_11_ad0064da92.jpg","laane6_12_3469b9995a.jpg","laane6_13_fa36b18f9e.jpg","laane6_14_7abdfd80e9.jpg","laane6_15_4c947ef8a5.jpg","laane6_16_9c79da5fa5.jpg","laane6_17_cac21ca80f.jpg","laane6_18_f2f8543ef9.jpg","laane6_19_d1d22fd29b.jpg","laane6_20_5eaaead865.jpg","laane6_21_479ed0fcf2.jpg","laane6_22_6cdf8c30d0.jpg","laane6_23_041085234e.jpg","laane6_24_6760b01ced.jpg"],
  },
  {
    slug: "sopruse-10-viljandi",
    asukoht: "Viiratsi, Sõpruse 10",
    ehitusaeg: "2023-04-01",
    pildid: ["sopruse10_1_119b3b7afd.jpg","sopruse10_2_ad75279b41.jpg","sopruse10_3_4fc5559aab.jpg","sopruse10_4_894c045256.jpg","sopruse10_5_fa317efafd.jpg","sopruse10_6_bc89ee27d7.jpg","sopruse10_7_8c3a94a310.jpg","sopruse10_8_2371b2da68.jpg","sopruse10_9_0d84d23671.jpg","sopruse10_10_af864583f6.jpg","sopruse10_11_d912a128eb.jpg","sopruse10_12_ab08af00bd.jpg","sopruse10_13_0f9697da89.jpg"],
  },
  {
    slug: "riia-15-viljandi",
    asukoht: "Viljandi, Riia 15",
    ehitusaeg: "2023-02-01",
    pildid: ["riia15_1_48979bdaf8.jpg","riia15_2_af071a5dab.jpg","riia15_3_9714bdbf6c.jpg","riia15_4_e1e22aea9a.jpg","riia15_5_acc9204dad.jpg","riia15_6_68a7b569f0.jpg","riia15_7_79ecf0315b.jpg","riia15_8_add3981b9d.jpg","riia15_9_1f34431b8c.jpg","riia15_10_2de37c1df2.jpg","riia15_11_dbc23be361.jpg","riia15_12_05b91be266.jpg","riia15_13_955a0348df.jpg","riia15_14_3afbc8b3ca.jpg","riia15_15_48ebca61d0.jpg","riia15_16_b4537ec01c.jpg","riia15_17_8d8a8541d4.jpg","riia15_18_09b8819f0c.jpg"],
  },
  {
    slug: "riia-mnt-40a-vannituba",
    asukoht: "Viljandi, Riia mnt 40a",
    ehitusaeg: "2022-11-01",
    pildid: ["Riia_mnt_40a_1_7d90ce66d6.jpg","Riia_mnt_40a_2_e65336d51b.jpg","Riia_mnt_40a_3_4f6cc4902c.jpg","Riia_mnt_40a_4_3208715d84.jpg","Riia_mnt_40a_5_cb7bee91f1.jpg","Riia_mnt_40a_6_45d4849bb1.jpg","Riia_mnt_40a_7_0a79b735a1.jpg","Riia_mnt_40a_8_ace6a890a5.jpg","Riia_mnt_40a_9_57d8cf218e.jpg","Riia_mnt_40a_10_890408eefa.jpg","Riia_mnt_40a_11_419129bad3.jpg","Riia_mnt_40a_12_02a59f17fb.jpg","Riia_mnt_40a_13_b091626a7f.jpg","Riia_mnt_40a_14_fea92a4146.jpg","Riia_mnt_40a_15_afcc13bc15.jpg","Riia_mnt_40a_16_a83c5bfd50.jpg","Riia_mnt_40a_17_8d86d1f5ee.jpg","Riia_mnt_40a_18_7cfd2a1384.jpg","Riia_mnt_40a_19_db8803af29.jpg","Riia_mnt_40a_20_f91d069bfc.jpg"],
  },
  {
    slug: "loode-tn-asuv-korter",
    asukoht: "Viljandi, Loode tn",
    ehitusaeg: "2022-10-22",
    pildid: ["loode1_33d44cf48f.jpg","loode2_8a69feb552.jpg","loode3_20ac30ba64.jpg","loode4_8e3a55453b.jpg","loode5_3673d52b89.jpg","loode6_9f276fe894.jpg","loode7_f6c7b3cd76.jpg","loode8_1747cbae50.jpg","loode9_d656d812cc.jpg","loode10_b1a52876ea.jpg","loode11_631d82d025.jpg","loode12_3a42dcc72d.jpg","loode13_63adc99346.jpg"],
  },
  {
    slug: "vannituba-valuoja-2",
    asukoht: "Viljandi, Valuoja puiestee",
    ehitusaeg: "2022-08-01",
    pildid: ["IMG_20220908_155437_81277402b1.jpg","IMG_20220908_155442_918f9954fb.jpg","IMG_20220908_155446_791ee39f22.jpg","IMG_20220908_155451_857d6c4e55.jpg","IMG_20220908_155502_161cc6cbbe.jpg","IMG_20220908_155507_ba979dcc20.jpg","IMG_20220908_155517_314b611f0f.jpg","IMG_20220908_155520_16e7e0da2a.jpg","IMG_20220908_155546_5067d8a588.jpg","IMG_20220908_155623_93239977cd.jpg","IMG_20220908_155628_6a7bbd0e9c.jpg"],
  },
  {
    slug: "k6os-asuv-talumaja",
    asukoht: "Põhja-Sakala vald, Viljandimaa, Kõos asuv talumaja",
    ehitusaeg: "2022-07-15",
    pildid: ["IMG_20220720_184935_9e540b0fc5.jpg","IMG_20220720_184942_40ddffc362.jpg","IMG_20220720_184953_d65162286c.jpg","IMG_20220720_184959_0328c3c521.jpg","IMG_20220720_185029_41229b5d9e.jpg"],
  },
  {
    slug: "kauge-tn-asuv-korter",
    asukoht: "Viljandi, Kauge tänav",
    ehitusaeg: "2022-05-29",
    pildid: ["kauge4_bcca24d1fc.jpg","kauge6_cb305ace53.jpg","kauge7_234fc11811.jpg","kauge9_869f7cd69f.jpg","kauge11_73f763a981.jpg","kauge15_de728436fa.jpg","kauge17_49783f485a.jpg","kauge19_0b31c2ea1a.jpg","kauge20_952007d1d6.jpg"],
  },
  {
    slug: "loodes-asuv-korter",
    asukoht: "Viljandi, Loode tn",
    ehitusaeg: "2021-08-01",
    pildid: ["maennimaee1_74d5f47ac0.jpg","maennimaee2_eda9a07fda.jpg","maennimaee3_82420f7098.jpg","maennimaee4_99287b5c55.jpg","maennimaee5_b5bbbfb4a5.jpg"],
  },
  {
    slug: "vaike-kaares-asuv-korter",
    asukoht: "Viljandi, Väike-Kaare",
    ehitusaeg: "2020-04-06",
    pildid: ["paalalinn1_48ad0206a6.jpg","paalalinn2_a81372cc1e.jpg","paalalinn3_bd8ec26611.jpg","paalalinn4_ad4ac451b6.jpg","paalalinn5_389d0d638d.jpg","paalalinn6_d23e58c70c.jpg","paalalinn7_fb4f110882.jpg","paalalinn8_aa1d536d51.jpg","paalalinn9_6078763493.jpg","paalalinn10_18285bac91.jpg"],
  },
  {
    slug: "vannituba-valuoja-1",
    asukoht: "Viljandi, Valuoja puiestee",
    ehitusaeg: "2020-01-01",
    pildid: ["object1_feddd8840b.jpg","object2_b136499036.jpg","object3_79539e976a.jpg","object4_679f3114eb.jpg","object5_3a2d396725.jpg","object6_b5ec8ba099.jpg","object7_c8c4a6dac9.jpg","object8_98fdfaf3a9.jpg","object9_67a4f4895e.jpg"],
  },
  {
    slug: "paril-asuv-vannituba",
    asukoht: "Viljandi maakond, Päri",
    ehitusaeg: "2016-06-01",
    pildid: ["paeri1_d7ec29ce9d.jpg","paeri2_49b85ff327.jpg","paeri3_e2c1c1c952.jpg","paeri4_dbb2e27be2.jpg","paeri5_98e455e487.jpg"],
  },
  {
    slug: "vaike-kaare",
    asukoht: "Viljandi, Väike-Kaare",
    ehitusaeg: "2024-06-01",
    pildid: ["1000003650.jpg","1000003652.jpg","1000003653.jpg","1000003656.jpg"],
  },
]

// Pre-sorted by date (newest first) and URLs resolved
export default albums.map(album => ({
  ...album,
  pildid: album.pildid.map(file => ({
    url: `/img/${album.slug}/${file}`,
    alt: album.asukoht,
    name: file,
  })),
}))
