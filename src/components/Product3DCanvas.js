"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const frameUrls = [
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f2a98e04bfaba1bfda_croptab_new_00002.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f2845d566e278ecb62_croptab_new_00003.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f218f6f5a4090d0fb2_croptab_new_00004.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f25218f5970b035f78_croptab_new_00005.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f4d6652dc29c10d574_croptab_new_00007.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f224c93ddd626f72e5_croptab_new_00008.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f24e3f7adb5af3ddde_croptab_new_00009.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f21e0040bc5ff85bab_croptab_new_0001.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f37ae230d0021da609_croptab_new_00012.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f2ee1574e4ffc13a43_croptab_new_00013.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f31d5d7895b6f76775_croptab_new_00014.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f3ee202d0323941c24_croptab_new_00015.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f3f363b6e8fdc35b4a_croptab_new_00017.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f310091de1e3ac7464_croptab_new_00018.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f30fd406088302dd3a_croptab_new_00019.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f34923c59421721c80_croptab_new_00020.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f4a5e06b045cca1dab_croptab_new_00022.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f4bcddafa37c10a5e9_croptab_new_00023.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f424c93ddd626f733d_croptab_new_00024.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f41e0040bc5ff85ce9_croptab_new_00026.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f481db0cb279397f67_croptab_new_00027.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f4b2439f0d4bc34d83_croptab_new_00028.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f493c86ef337d020a2_croptab_new_00029.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f4a98e04bfaba1c058_croptab_new_00030.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f574ffe7cdd2394948_croptab_new_00032.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f5262d38e1d21b5984_croptab_new_00033.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68fa88661062ffbb1ba647e0_soon_00013.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f588ea7d538eb39f43_croptab_new_00034.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f519fdd6a8c6a27d7e_croptab_new_00036.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f5f411f18d1c9d6f84_croptab_new_00037.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f5d25a4b8644e49415_croptab_new_00038.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f6aa7f7ef370d728a4_croptab_new_00039.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f69867aabab06c66c1_croptab_new_00040.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f67db0f15f11c48ae7_croptab_new_00042.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f63d357f6bd3bc3844_croptab_new_00043.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f618f6f5a4090d101e_croptab_new_00044.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f6df4e71c47dab363c_croptab_new_00046.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f76604e76e50853cc5_croptab_new_00047.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f89de897e57c1ce385_croptab_new_00048.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f83b9d156a8c5b1b6e_croptab_new_00049.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f898b87be89884caac_croptab_new_00050.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f8cf96d660c62c3fbf_croptab_new_00052.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f80e0446d485d83e87_croptab_new_00053.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f8e1a7bdc0a0d8c1ce_croptab_new_00054.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f8b7cffa97043b5dee_croptab_new_00055.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f8fa416941c8351165_croptab_new_00057.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f891b0d53ada18b745_croptab_new_00058.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f82dbb746fe2541d6b_croptab_new_00059.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f8f9fea6044d962904_croptab_new_00060.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f868a3480fb0d974fc_croptab_new_00062.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f82223786591643a46_croptab_new_00063.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f96350b59b297a0ed4_croptab_new_00064.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f97f60c09084f6ddf2_croptab_new_00066.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f9b02dacc44db84b29_croptab_new_00067.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f978d2595aa5e477aa_croptab_new_00068.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26faf9fea6044d962a67_croptab_new_00069.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f99de897e57c1ce3d6_croptab_new_00071.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26f90cc0d3377ea761fe_croptab_new_00072.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fa0edbc171005d4d0e_croptab_new_00073.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fa5cc6c022faf504e7_croptab_new_00074.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26faf9fea6044d962a64_croptab_new_00075.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26faea385f4c9877039d_croptab_new_00077.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fbb1a97fa2757676ce_croptab_new_00078.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fb12f69d812e6f1e15_croptab_new_00079.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fca39ebc5afa377ca5_croptab_new_00080.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fcc2d2f4ff06253f41_croptab_new_00082.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fc10609fbe4a71ee63_croptab_new_00083.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fb9dc321272607dcf8_croptab_new_00084.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fb0fd406088302df13_croptab_new_00086.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fcd9b106d598a24a96_croptab_new_00087.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fddf4e71c47dab3805_croptab_new_00088.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fd1b32c6b63446d110_croptab_new_00089.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fd56cc0bcd856a08fb_croptab_new_00091.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fdc1c1da4b59a59a00_croptab_new_00092.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fdea385f4c987703fc_croptab_new_00093.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fd9150d205858c5e24_croptab_new_00094.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fd24c93ddd626f7433_croptab_new_00095.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fd0fa168bb6498e1e7_croptab_new_00097.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fd3e516b016b723a09_croptab_new_00098.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fdb7cffa97043b5ecc_croptab_new_00099.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fd5734ee8910fd0ae8_croptab_new_00100.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fdaa28eb4763e05b41_croptab_new_00102.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fda98e04bfaba1c29c_croptab_new_00103.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fec1c1da4b59a59a32_croptab_new_00104.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fe5ecfa210bf503adf_croptab_new_00106.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26ff24ea6d06502a440b_croptab_new_00107.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26ff5ecfa210bf503b00_croptab_new_00108.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26fe91b0d53ada18b93c_croptab_new_00109.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e26feb95daae185da3976_croptab_new_00110.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2700e4c0542192543c8c_croptab_new_00112.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2700d29e1c173b272db9_croptab_new_00113.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270010091de1e3ac814e_croptab_new_00114.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27003417337511421a74_croptab_new_00117.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27004fea034ab61cb70b_croptab_new_00118.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2700f46f597d97c17a77_croptab_new_00119.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2701b52d1005c1a29585_croptab_new_00120.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2701afff242739ae4614_croptab_new_00122.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2701606331562dd2289b_croptab_new_00123.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27020aaf7e4f61929cd0_croptab_new_00124.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27017ae230d0021da989_croptab_new_00125.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2701606331562dd22897_croptab_new_00127.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2702088595e8ef75b725_croptab_new_00128.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270279dcce98192f5363_croptab_new_00129.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27023d357f6bd3bc3b55_croptab_new_00130.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27028b191b291cc19c7c_croptab_new_00132.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2702713635bf20c7b5cc_croptab_new_00133.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270290072b0f6df3ec2e_croptab_new_00134.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2702e17eb946217c3413_croptab_new_00135.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2703d62e83783cf31832_croptab_new_00137.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270346a0be8c0f9ca64f_croptab_new_00138.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2703c3268358a17d4703_croptab_new_00139.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27035bb0c8aa45434daa_croptab_new_00140.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2703d25a4b8644e49a66_croptab_new_00142.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2703cd5087fc161cbeef_croptab_new_00143.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27041a72b7cda2f3b216_croptab_new_00144.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270478d2595aa5e47de8_croptab_new_00145.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27041e0040bc5ff8633b_croptab_new_00147.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2704db23f2ae51f9df8a_croptab_new_00148.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2704d6652dc29c10ecdc_croptab_new_00149.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270465300b39ac4696ce_croptab_new_00151.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2705469624c8b0678b60_croptab_new_00152.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27057f3cdbb1b709a8d1_croptab_new_00153.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27054a78742442016407_croptab_new_00154.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27056e53618b5df30766_croptab_new_00156.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270668a3480fb0d97894_croptab_new_00157.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27051db4ae23793c24cc_croptab_new_00158.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27050425395abb94c45b_croptab_new_00159.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2705d0ff386652f60ee9_croptab_new_00160.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270590072b0f6df3ed25_croptab_new_00162.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27052c4d37ace4cd9786_croptab_new_00163.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27056ffff13e7fc2c2a2_croptab_new_00164.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2706b1125bce261a06af_croptab_new_00166.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2706da8f8bfa79d54ae7_croptab_new_00167.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2707232e643c8460ff5b_croptab_new_00168.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27079150d205858c6061_croptab_new_00169.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27075b8dd0f30cf79a7d_croptab_new_00171.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27075637bb157bfea83e_croptab_new_00172.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27080e0446d485d84174_croptab_new_00173.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2707e17eb946217c357f_croptab_new_00174.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27074cd339df45ae0796_croptab_new_00175.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e27084f2be98dbb04f946_croptab_new_00177.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e270871635097e9698e52_croptab_new_00178.avif",
  "https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/695e2708088595e8ef75b80f_croptab_new_00179.avif"
];

export default function Product3DCanvas() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    let loaded = 0;
    const total = frameUrls.length;
    const imgs = [];

    frameUrls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        imgs[i] = img;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === total) {
          imagesRef.current = imgs;
          setIsReady(true);
          startAnimation(imgs);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === total) {
          imagesRef.current = imgs;
          setIsReady(true);
          startAnimation(imgs);
        }
      };
    });

    function drawFrame(idx, imgsList) {
      const img = imgsList[idx];
      if (!img || !canvas) return;

      const cw = canvas.width / (window.devicePixelRatio || 1);
      const ch = canvas.height / (window.devicePixelRatio || 1);
      const iw = img.width;
      const ih = img.height;

      const scale = Math.max(cw / iw, ch / ih);
      const x = (cw / 2) - (iw / 2) * scale;
      const y = (ch / 2) - (ih / 2) * scale;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, iw * scale, ih * scale);
    }

    function startAnimation(imgsList) {
      drawFrame(0, imgsList);

      const frameObj = { frame: 0 };
      const triggerEl = sectionRef.current;
      if (!triggerEl) return;

      gsap.to(frameObj, {
        frame: total - 1,
        ease: "none",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        onUpdate: () => {
          const currentIdx = Math.round(frameObj.frame);
          drawFrame(currentIdx, imgsList);
        },
      });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        height: "350vh", // pinned 3.5x viewport
        backgroundColor: "#404F1D",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isReady ? 1 : 0.4,
            transition: "opacity 0.8s ease",
          }}
        />

        {/* Overlay text */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            right: "5%",
            textAlign: "center",
            color: "#F4EDE6",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              textTransform: "uppercase",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              color: "#9FD23A",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            PRECISION CAPSULE TECH
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            100kg of Traditional Fertilizer Reimagined into a High-Yield AI Formula
          </h2>
        </div>
      </div>
    </div>
  );
}
